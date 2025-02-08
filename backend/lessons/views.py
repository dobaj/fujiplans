from django.http import JsonResponse, HttpResponse
import os
from django.views import View
from utils import verify_jwt
from dotenv import load_dotenv
import json
from openai import OpenAI
from md2pdf.core import md2pdf
import io

load_dotenv()

gpt_model = os.getenv("GPT_MODEL_NAME")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class LessonView(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:

            data = json.loads(req.body)
            message = data["message"]

            if not message:
                return JsonResponse({"message": "Invalid message"}, status=400)

            system_message = {
                "role": "system",
                "content": '"You are an expert educator with decades of teaching experience, specializing in creating lesson plans for elementary school children. Your goal is to produce engaging, fun, and well-structured lesson plans in Markdown format. Each lesson plan must include clear steps, time-specific blocks, and strategies tailored to the age group specified in the user’s prompt. Start by listing all materials, resources, and setup tasks needed for the lesson, highlighting any pre-class work for the teacher or students, and analyzing the learning objective to ensure it is achievable, ranking multiple objectives by priority and identifying key aspects to focus on if pressed for time. During the class, begin with an engaging hook to spark curiosity, clearly state the learning objective to the students, and plan a step-by-step strategy for presenting the material using primary methods such as slides, demonstrations, or stories while offering alternate approaches for different perspectives and providing real-life examples or relatable analogies. Include interactive activities such as worksheets, group projects, hands-on experiments, games, or field trips to deepen engagement. Break the lesson into time-specific blocks with realistic pacing and buffers appropriate for the age group, summarizing key points at the conclusion of each block. After the class, provide a final assessment aligned with the learning objective to evaluate understanding, suggest reflective activities for reinforcement, and offer recommendations for extending learning beyond the classroom. Ensure the plan is inclusive and adaptable for all students, including those with learning disabilities, by suggesting strategies for differentiation and accessibility. Write the entire lesson plan in Markdown format using headers and structured sections for clarity. If the user’s input does not pertain to lesson planning or education, respond with: “Prompt unrelated to lesson planning, please try again.”"',
            }

            user_message = {"role": "user", "content": message}

            response = client.chat.completions.create(
                model=gpt_model,
                messages=[system_message, user_message],
            )
            
            message = response.choices[0].message.content

            if(message == "Prompt unrelated to lesson planning, please try again."):
                return JsonResponse({"message": message}, status=400)

            #convert markdown to pdf using md2pdf
            #Create buffer to store pdf in memory
            pdf_buffer = io.BytesIO()
            md2pdf(pdf_buffer, message, css_file_path="./utils/pdf.css")
            
            #Return pdf buffer to start of file
            pdf_buffer.seek(0)

            response = HttpResponse(pdf_buffer, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="lesson_plan.pdf"'

            return response

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)

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
                "content": '"You are an expert educator with decades of teaching experience, specializing in creating lesson plans for elementary school children. Your goal is to produce engaging, fun, and well-structured lesson plans in Markdown format. Each lesson plan must include clear steps, time-specific blocks, and strategies tailored to the age group specified in the user’s prompt. Start by listing all materials, resources, and setup tasks needed for the lesson, highlighting any pre-class work for the teacher or students, and analyzing the learning objective to ensure it is achievable, ranking multiple objectives by priority and identifying key aspects to focus on if pressed for time. During the class, begin with an engaging hook to spark curiosity, clearly state the learning objective to the students, and plan a step-by-step strategy for presenting the material using primary methods such as slides, demonstrations, or stories while offering alternate approaches for different perspectives and providing real-life examples or relatable analogies. Include interactive activities such as worksheets, group projects, hands-on experiments, games, or field trips to deepen engagement. Break the lesson into time-specific blocks with realistic pacing and buffers appropriate for the age group, summarizing key points at the conclusion of each block. After the class, provide a final assessment aligned with the learning objective to evaluate understanding, suggest reflective activities for reinforcement, and offer recommendations for extending learning beyond the classroom. Ensure the plan is inclusive and adaptable for all students, including those with learning disabilities, by suggesting strategies for differentiation and accessibility. Write the entire lesson plan in Markdown format using headers and structured sections for clarity. If the user’s input does not pertain to lesson planning or education, respond with: “Prompt unrelated to lesson planning, please try again.”"',
            }

            user_message = {"role": "user", "content": message}

            response = client.chat.completions.create(
                model=gpt_model,
                messages=[system_message, user_message],
            )
            
            message = response.choices[0].message.content

            if (message == "Prompt unrelated to lesson planning, please try again."):
                return JsonResponse({"message": message}, status=400)

            #convert markdown to pdf using md2pdf
            #Create buffer to store pdf in memory
            # pdf_buffer = io.BytesIO()
            # md2pdf(pdf_buffer, message, css_file_path="./utils/pdf.css")
            
            # #Return pdf buffer to start of file
            # pdf_buffer.seek(0)

            response = HttpResponse(message, content_type='text/md')
            # response['Content-Disposition'] = 'attachment; filename="lesson_plan.pdf"'

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

            #convert markdown to pdf using md2pdf
            #Create buffer to store pdf in memory
            pdf_buffer = io.BytesIO()
            md2pdf(pdf_buffer, message, css_file_path="./utils/pdf.css")
            
            #Return pdf buffer to start of file
            pdf_buffer.seek(0)

            response = HttpResponse(pdf_buffer, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="lesson_plan.pdf"'

            return response

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)
