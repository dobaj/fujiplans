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

from utils import getGoogleOauthToken, getGoogleUserInfo, verify_jwt

from .models import User

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
    # tester code for verify jwt, now you can use this else where
    # @verify_jwt
    # def post(self, req, payload, *args, **kwargs):
    #     print(payload)
    #     user_id = self.kwargs.get('id')
    #     print(user_id)
    #     return HttpResponse("login")

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
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=30),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "Login successful",
                    "access_token": access_token,
                    "user": {"_id": user._id, "email": user.email, "name": user.name},
                },
                status=200,
            )

            one_year = 60 * 60 * 24 * 365

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                max_age=one_year,
                httponly=True,
                samesite="None",
                secure=True,
            )

            return res

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class RegisterView(View):
    def get(self, req):
        return HttpResponse("register")

    def post(self, req):
        try:
            data = json.loads(req.body)

            if (
                not data.get("Email")
                or not data.get("Password")
                or not data.get("Name")
            ):
                return JsonResponse(
                    {"message": "Please fill out all fields!"}, status=400
                )

            if User.objects.filter(email=data["Email"]).exists():
                return JsonResponse(
                    {"message": f'User with the email: {data["Email"]} already exists'},
                    status=400,
                )

            password = make_password(data["Password"])

            user = User.objects.create(
                email=data["Email"], name=data["Name"], password=password
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
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=30),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "User registered successfully",
                    "access_token": access_token,
                    "user": {"_id": user._id, "email": user.email, "name": user.name},
                },
                status=200,
            )

            one_year = 60 * 60 * 24 * 365

            # TODO: remove secure = True for safari in development, remember to add back secure = True
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                max_age=one_year,
                httponly=True,
                samesite="None",
                secure=True,
            )

            return res

        except Exception as e:

            return JsonResponse({"message": e}, status=400)


class RefreshView(View):

    def get(self, req):
        try:

            refresh_token = req.COOKIES.get("refresh_token")

            if not refresh_token:
                return JsonResponse({"message": "No token"}, status=401)

            payload = jwt.decode(refresh_token, rjwt_secret, algorithms="HS256")

            user = User.objects.filter(_id=payload["_id"]).first()

            if not user:
                return JsonResponse({"message": "No user found"}, status=401)

            access_token = jwt.encode(
                {
                    "_id": str(user._id),
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=30),
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
                defaults={"name": google_user["name"]},
            )

            if created:
                # Set the password to unusable since it's an OAuth user
                user.set_unusable_password()
                user.save()

            print(user)

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
                    "exp": datetime.now(tz=timezone.utc) + timedelta(days=30),
                },
                ajwt_secret,
                algorithm="HS256",
            )

            res = JsonResponse(
                {
                    "message": "User logged in using Google",
                    "access_token": access_token,
                    "user": {"_id": user._id, "email": user.email, "name": user.name},
                },
                status=200,
            )

            one_year = 60 * 60 * 24 * 365

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                max_age=one_year,
                httponly=True,
                samesite="None",
                secure=True,
            )

            return res

        except Exception as e:

            return JsonResponse({"message": str(e)}, status=400)
