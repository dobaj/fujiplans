from django.http import JsonResponse, HttpRequest
import os
from dotenv import load_dotenv
import jwt
from functools import wraps

load_dotenv()

ajwt_secret = os.getenv('AJWT_SECRET')
rjwt_secret = os.getenv('RJWT_SECRET')


def verify_jwt(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = HttpRequest.headers['Authorization'].split(' ')[1]
        if not token:
            return JsonResponse({"msg": "Token required"})
        try:
            payload = jwt.decode(token, ajwt_secret, algorithms="HS256")
        except jwt.ExpiredSignatureError:
            return JsonResponse({"msg": "Access token expired"})
        except jwt.InvalidTokenError:
            return JsonResponse({"msg": "Invalid token"})

        return func(*args, **kwargs, payload=payload)

    return wrapper
