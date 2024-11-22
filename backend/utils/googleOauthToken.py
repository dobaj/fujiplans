import os
from dotenv import load_dotenv
import requests

load_dotenv()

def getGoogleOauthToken(code):
    url = 'https://oauth2.googleapis.com/token'

    values = {
        'code': code,
        'client_id': os.getenv('GOOGLE_CLIENT_ID'),
        'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
        'redirect_uri': os.getenv('GOOGLE_OAUTH_REDIRECT_URL'),
        'grant_type': 'authorization_code'
    } 

    try:
        response = requests.post(url, data=values)

        return response.json()
    
    except Exception as e:

        raise Exception(str(e))

def getGoogleUserInfo(access_token, id_token):
    try:
        url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'
        
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        
        response = requests.get(url, headers=headers)

        return response.json()
    
    except Exception as e:

        raise Exception(str(e))
