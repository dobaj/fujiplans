import json
import os
import uuid
from datetime import datetime, timedelta, timezone
import jwt
from django.contrib.auth.hashers import check_password, make_password
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views import View
from dotenv import load_dotenv
from utils import GoogleCloudStorage, html_to_pdf, validate_pdf_buffer

from utils import getGoogleOauthToken, getGoogleUserInfo, verify_jwt

from .models import User, Favourites

load_dotenv()

ajwt_secret = os.getenv("AJWT_SECRET")
rjwt_secret = os.getenv("RJWT_SECRET")


class UserView(View):
    def post(self, req):
        try:
            # Create a response to log the user out
            res = JsonResponse({"msg": "Logged out successfully"}, status=200)

            # Delete the refresh token cookie
            # Ensure the cookie name is correct
            res.delete_cookie("refresh_token")

            return res
        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)

    @verify_jwt
    def get(self, req, payload, *args, **kwargs):
        try:
            user = User.objects.filter(_id=payload["_id"]).first()

            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            # Use model_to_dict to serialize the user object
            user_data = model_to_dict(user, fields=["_id", "email", "name"])

            if isinstance(user._id, uuid.UUID):
                user_data["_id"] = str(user._id)

            return JsonResponse({"user": user_data}, status=200)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class LoginView(View):
    def post(self, req):
        try:
            data = json.loads(req.body)

            if not data.get("Email") or not data.get("Password"):
                return JsonResponse(
                    {"message": "Please fill out all fields!"}, status=400
                )

            user = User.objects.filter(email=data["Email"]).first()

            if not user:
                return JsonResponse({"message": "Invalid credentials!"}, status=401)

            is_valid = check_password(data["Password"], user.password)

            if not is_valid:
                return JsonResponse({"message": "Invalid credentials!"}, status=401)

            refresh_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                rjwt_secret,
                algorithm="HS256",
            )

            access_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "Login successful",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": {
                        "_id": user._id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=200,
            )

            return res

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class RegisterView(View):
    def post(self, req):
        try:
            data = json.loads(req.body)

            if (
                not data.get("Email")
                or not data.get("Password")
                or not data.get("FirstName")
                or not data.get("LastName")
            ):
                return JsonResponse(
                    {"message": "Please fill out all fields!"}, status=400
                )

            if User.objects.filter(email=data["Email"]).exists():
                return JsonResponse(
                    {"message": f"User with the email: {data['Email']} already exists"},
                    status=400,
                )

            password = make_password(data["Password"])

            user = User.objects.create(
                email=data["Email"],
                first_name=data["FirstName"],
                last_name=data["LastName"],
                password=password,
            )

            user.save()

            refresh_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                rjwt_secret,
                algorithm="HS256",
            )

            access_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "User registered successfully",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": {
                        "_id": user._id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=200,
            )

            return res

        except Exception as e:
            return JsonResponse({"message": e}, status=400)


class RefreshView(View):
    def post(self, req):
        try:
            data = json.loads(req.body)
            refresh_token = data.get("refresh_token")

            if not refresh_token:
                return JsonResponse({"message": "No token"}, status=401)

            payload = jwt.decode(refresh_token, rjwt_secret, algorithms="HS256")

            user = User.objects.filter(_id=payload["_id"]).first()

            if not user:
                return JsonResponse({"message": "No user found"}, status=401)

            access_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            return JsonResponse({"access_token": access_token}, status=200)
        except jwt.ExpiredSignatureError:
            return JsonResponse({"message": "Token expired"}, status=498)
        except jwt.InvalidTokenError:
            return JsonResponse({"message": "Invalid token"}, status=498)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class GoogleOauth(View):
    def get(self, req):
        try:
            code = req.GET.get("code")

            if not code:
                return JsonResponse({"message": "No code"}, status=400)

            response = getGoogleOauthToken(code)

            access_token = response.get("access_token")

            id_token = response.get("id_token")

            google_user = getGoogleUserInfo(access_token, id_token)

            if not google_user["verified_email"]:
                return JsonResponse({"message": "Email not verified"}, status=403)

            user, created = User.objects.get_or_create(
                email=google_user["email"],
                defaults={
                    "first_name": google_user["given_name"],
                    "last_name": google_user["family_name"],
                },
            )

            if created:
                # Set the password to unusable since it's an OAuth user
                user.password = None
                user.save()

            refresh_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                rjwt_secret,
                algorithm="HS256",
            )

            access_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=365),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "User logged in using Google",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": {
                        "_id": user._id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=200,
            )

            return res

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


# TODO: Add ability to favourite a post
class FavouritesView(View):
    @verify_jwt
    def get(self, req, payload):
        try:
            user_id = payload["_id"]
            user = User.objects.filter(_id=user_id).first()
            if user_id:
                favourites = Favourites.objects.filter(user=user)
            else:
                return JsonResponse({"error": "User not found"}, status=404)

            favourites_data = []
            for fav in favourites:
                favourites_data.append(
                    {
                        "_id": fav._id,
                        "subject": fav.subject,
                        "gcs_url": fav.gcs_url,
                        "created_at": fav.created_at.isoformat(),
                    }
                )

            return JsonResponse({"favourites": favourites_data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    @verify_jwt
    def post(self, req, payload):
        try:
            user_id = payload["_id"]

            # Check if user exists
            try:
                user = User.objects.get(_id=user_id)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)

            data = json.loads(req.body)

            if "message" not in data:
                return JsonResponse({"error": "Please upload a file!"}, status=400)

            pdf_buffer = html_to_pdf(data["message"])

            try:
                file_metadata = validate_pdf_buffer(pdf_buffer)

                gcs = GoogleCloudStorage()

                upload_result = gcs.upload_file(
                    pdf_buffer,
                    destination_path=f"favourites/{uuid.uuid4()}_{file_metadata['name']}",
                    content_type=file_metadata["type"],
                )

                favourite = Favourites.objects.create(
                    user=user,
                    pdf_file=upload_result["path"],
                    gcs_url=upload_result["url"],
                    subject=req.POST.get("subject") or "English",
                )

                return JsonResponse(
                    {
                        "message": "Favourite created successfully",
                        "favourite": {
                            "_id": favourite._id,
                            "user": str(favourite.user._id),
                            "pdf_file": favourite.pdf_file,
                            "subject": favourite.subject,
                            "gcs_url": favourite.gcs_url,
                            "created_at": favourite.created_at.isoformat(),
                        },
                    },
                    status=201,
                )

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
