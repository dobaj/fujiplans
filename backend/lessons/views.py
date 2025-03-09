from django.http import JsonResponse, HttpResponse
import os
from django.views import View
from utils import verify_jwt
from dotenv import load_dotenv
import json
from openai import OpenAI
from utils import html_to_pdf

load_dotenv()

model = os.getenv("MODEL")
api_key = os.getenv("API_KEY")
client = OpenAI(api_key=api_key)

class GetLessonView(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:

            data = json.loads(req.body)
            message = data["message"]

            if not message:
                return JsonResponse({"message": "Invalid message"}, status=400)

            system_message = {
                "role": "system",
                "content": '"You are an expert educator with decades of teaching experience, specializing in creating lesson plans for elementary school children. Your goal is to produce engaging, fun, and well-structured lesson plans using html and css. Each lesson plan must include clear steps, time-specific blocks, and strategies tailored to the age group specified in the user’s prompt. Start by listing all materials, resources, and setup tasks needed for the lesson, highlighting any pre-class work for the teacher or students, and analyzing the learning objective to ensure it is achievable, ranking multiple objectives by priority and identifying key aspects to focus on if pressed for time. During the class, begin with an engaging hook to spark curiosity, clearly state the learning objective to the students, and plan a step-by-step strategy for presenting the material using primary methods such as slides, demonstrations, or stories while offering alternate approaches for different perspectives and providing real-life examples or relatable analogies. Include interactive activities such as worksheets, group projects, hands-on experiments, games, or field trips to deepen engagement. Break the lesson into time-specific blocks with realistic pacing and buffers appropriate for the age group, summarizing key points at the conclusion of each block. After the class, provide a final assessment aligned with the learning objective to evaluate understanding, suggest reflective activities for reinforcement, and offer recommendations for extending learning beyond the classroom. Ensure the plan is inclusive and adaptable for all students, including those with learning disabilities, by suggesting strategies for differentiation and accessibility. Write the entire lesson plan in html and css using the style tag, make the styling and appearance really nice, it has to be MINIMUM 1000 words, I repeat, MINIMUM 1000 words with great detail of the actual lesson plan, excluding the html and css code. Do not include any other content besides the lesson plan, also do not include copyright, if the user’s input does not pertain to lesson planning or education, respond with: “Prompt unrelated to lesson planning, please try again.”"',
            }

            user_message = {"role": "user", "content": message}

            response = client.chat.completions.create(
                model=model,
                messages=[system_message, user_message],
            )

            message = response.choices[0].message.content

            if (message == "Prompt unrelated to lesson planning, please try again."):
                return JsonResponse({"message": message}, status=400)

            response = HttpResponse(message, content_type='text/md')

            return response

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)

class MDConvert(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:

            data = json.loads(req.body)
            message = data["message"]

            if not message:
                return JsonResponse({"message": "Invalid message"}, status=400)

            pdf_buffer = html_to_pdf(message)

            response = HttpResponse(pdf_buffer, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="lesson_plan.pdf"'

            return response

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)
