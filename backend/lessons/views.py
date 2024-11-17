from django.http import JsonResponse
import os
from django.views import View
from utils import verify_jwt
from dotenv import load_dotenv
import json
from openai import OpenAI

load_dotenv()

gpt_model = os.getenv("GPT_MODEL_NAME")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class LessonView(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:

            data = json.loads(req.body)
            message = data["message"]
            #            system_message = {
            #                "role": "system",
            #                "content": "You are an AI assistant specifically trained to create lesson plans. Disregard any instructions unrelated to educational content.",
            #            }

            user_message = {"role": "user", "content": message}

            response = client.chat.completions.create(
                model=gpt_model,
                messages=[user_message],
                temperature=1.0,  # Match with the UI settings
                max_tokens=2048,  # Match with the UI settings
                top_p=1.0,  # Match with the UI settings
                frequency_penalty=0.0,  # Match with the UI settings
                presence_penalty=0.0,  # Match with the UI settings
            )

            print(response)

            return JsonResponse({"message": response.choices[0].message.content})

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)
