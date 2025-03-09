from django.http import JsonResponse
import os
from dotenv import load_dotenv
import jwt
from functools import wraps

load_dotenv()

ajwt_secret = os.getenv("AJWT_SECRET")


def verify_jwt(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        # Access Authorization header using 'HTTP_AUTHORIZATION'
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            return JsonResponse({"msg": "Authorization header is required"}, status=401)

        # Split the Bearer token and extract the token part
        token = auth_header.split(" ")[1] if len(auth_header.split(" ")) == 2 else None
        if not token:
            return JsonResponse({"msg": "Token is required"}, status=401)

        try:
            # Decode JWT using the secret key
            payload = jwt.decode(token, ajwt_secret, algorithms="HS256")
        except jwt.ExpiredSignatureError:
            return JsonResponse({"msg": "Access token expired"}, status=403)
        except jwt.InvalidTokenError as e:
            return JsonResponse({"msg": "Invalid token"}, status=401)

        # Pass the decoded payload to the view function
        return func(self, request, *args, **kwargs, payload=payload)

    return wrapper
