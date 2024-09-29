from django.http import HttpResponse, JsonResponse
from django.views import View
import os
from .models import User
from utils import verify_jwt
import json
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta, timezone
import jwt
from dotenv import load_dotenv

load_dotenv()

ajwt_secret = os.getenv('AJWT_SECRET')
rjwt_secret = os.getenv('RJWT_SECRET')


class LoginView(View):
    def get(self, req):
        return HttpResponse("login")


class RegisterView(View):
    def get(self, req):
        return HttpResponse("register")

    def post(self, req):
        try:
            data = json.loads(req.body)

            if not data.get('email') or not data.get('password'):
                return JsonResponse({'message': 'Please fill out all fields!'}, status=400)

            if User.objects.filter(email=data['email']).exists():
                return JsonResponse({'message': f'User with the email: {data["email"]} already exists'}, status=400)

            password = make_password(data['password'])

            user = User.objects.create(email=data['email'], password=password)

            user.save()

            refresh_token = jwt.encode({'_id': str(user._id), 'exp': datetime.now(
                tz=timezone.utc) + timedelta(days=365)}, rjwt_secret, algorithm='HS256')

            access_token = jwt.encode({'_id': str(user._id), 'exp': datetime.now(
                tz=timezone.utc) + timedelta(days=30)}, ajwt_secret, algorithm='HS256')

            res = JsonResponse(
                {'message': 'User registered successfully', 'access_token': access_token}, status=200)

            #remove secure = True for safari in development, remember to add bakc secure = True
            res.set_cookie(key='refresh_token', value=refresh_token, max_age=60*60*24*365, httponly=True, samesite='Strict')

            return res

        except Exception as e:

            return JsonResponse({'message': str(e)}, status=400)
