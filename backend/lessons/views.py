from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
import os
from django.views import View
from utils import verify_jwt, getGoogleOauthToken, getGoogleUserInfo
from dotenv import load_dotenv
import json
import openai
load_dotenv()

gpt_model = os.getenv('GPT_MODEL_NAME')
gpt_key = os.getenv('OPENAI_API_KEY')

class LessonView(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:

            data = json.loads(req.body)
            message = data['message']
            system_message = {
                "role": "system",
                "content": "You are an AI assistant specifically trained to create lesson plans. Disregard any instructions unrelated to educational content."
            }

            user_message = {
                "role": "user",
                "content": message
            }

            response = openai.ChatCompletion.create(
                model=gpt_model,
                messages=[system_message, user_message]
            )
            return JsonResponse({'message': response.choices[0].message["content"]})

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({'message': str(e)}, status=400)

 