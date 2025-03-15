from django.http import JsonResponse, HttpResponse
import os
from django.views import View
from users.models import User
from lessons.models import Lesson
from utils import verify_jwt
from dotenv import load_dotenv
import json
from openai import OpenAI
from utils import html_to_pdf
import re

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
                "content": '"You are an expert educator with decades of teaching experience, specializing in creating lesson plans for elementary to highschool students. Your goal is to produce engaging, fun, and well-structured lesson plans using html and css. Each lesson plan must include clear steps, time-specific blocks, and strategies tailored to the age group specified in the user’s prompt. Start by listing all materials, resources, and setup tasks needed for the lesson, highlighting any pre-class work for the teacher or students, and analyzing the learning objective to ensure it is achievable, ranking multiple objectives by priority and identifying key aspects to focus on if pressed for time. During the class, begin with an engaging hook to spark curiosity, clearly state the learning objective to the students, and plan a step-by-step strategy for presenting the material using primary methods such as slides, demonstrations, or stories while offering alternate approaches for different perspectives and providing real-life examples or relatable analogies. Include interactive activities such as worksheets, group projects, hands-on experiments, games, or field trips to deepen engagement. Break the lesson into time-specific blocks with realistic pacing and buffers appropriate for the age group, summarizing key points at the conclusion of each block. After the class, provide a final assessment aligned with the learning objective to evaluate understanding, suggest reflective activities for reinforcement, and offer recommendations for extending learning beyond the classroom. Ensure the plan is inclusive and adaptable for all students, including those with learning disabilities, by suggesting strategies for differentiation and accessibility. Write the entire lesson plan in html and css using the style tag, make the styling and appearance really nice, try using the following colors and any other colors you feel would complement well, #9BAF6D, #CF7D7D, #DA928E, #ECEFA2, #E0E1CB, #AE4747, #ACA477, #CF7D7D, #D9918D, #F6F0E9, prefer lighter and more vibrant colors. The lesson plan has to be MINIMUM 1000 words, I repeat, MINIMUM 1000 words with great detail of the actual lesson plan, excluding the html and css code. Do not include any other content besides the lesson plan, also do not include copyright, if the user’s input does not pertain to lesson planning or education, respond with: “Prompt unrelated to lesson planning, please try again.”"',
            }

            user_message = {"role": "user", "content": message}

            response = client.chat.completions.create(
                model=model,
                messages=[system_message, user_message],
            )

            message = response.choices[0].message.content

            user_id = payload["_id"]

            user = User.objects.get(_id=user_id)

            h1_pattern = r"<h1[^>]*>(.*?)</h1>"

            # Execute the regex to find matches
            match = re.search(h1_pattern, message, re.IGNORECASE)

            # Return the captured group (text inside h1) or default value if not found
            title = match.group(1) if match else "Lesson Plan"

            lesson = Lesson.objects.create(user=user, title=title, content=message)
            lesson_id = str(lesson._id)

            if message == "Prompt unrelated to lesson planning, please try again.":
                return JsonResponse({"message": message}, status=400)

            return JsonResponse({"message": message, "lesson_id": lesson_id})

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)


class HTMLConvert(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:
            data = json.loads(req.body)
            message = data["message"]

            if not message:
                return JsonResponse({"message": "Invalid message"}, status=400)

            pdf_buffer = html_to_pdf(message)

            response = HttpResponse(pdf_buffer, content_type="application/pdf")
            response["Content-Disposition"] = 'attachment; filename="lesson_plan.pdf"'

            return response

        except Exception as e:
            # Catch any errors and return them in a response
            return JsonResponse({"message": str(e)}, status=400)


class UpdateLesson(View):
    @verify_jwt
    def post(self, req, payload, *args, **kwargs):
        try:
            data = json.loads(req.body)
            user_id = payload["_id"]
            user = User.objects.get(_id=user_id)

            title = data.get("title", "Untitled Lesson")
            content = data.get("content", "")
            lesson_id = data.get("lesson_id", -1)

            if not content:
                return JsonResponse({"message": "Content is required"}, status=400)

            lesson = Lesson.objects.filter(_id=lesson_id, user=user_id).first()
            if not lesson:
                lesson = Lesson.objects.create(user=user, title=title, content=content)
                return JsonResponse(
                    {"message": "Lesson created successfully", "lesson_id": lesson._id},
                    status=201,
                )
            else:
                lesson.title = title
                lesson.content = content
                lesson.save()

                return JsonResponse(
                    {
                        "lesson_id": lesson._id,
                    },
                    status=201,
                )

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class GetFavouriteLessons(View):
    @verify_jwt
    def get(self, req, payload, *args, **kwargs):
        try:
            user_id = payload["_id"]
            lessons = Lesson.objects.filter(user=user_id).values(
                "_id", "title", "content"
            )

            return JsonResponse({"favourite_lessons": list(lessons)}, status=200)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


class GetFavouriteLesson(View):
    @verify_jwt
    def get(self, req, payload, *args, **kwargs):
        try:
            user_id = payload["_id"]
            lesson_id = req.GET.get(
                "lesson_id"
            )  # Fetch `lesson_id` from query parameters

            if lesson_id:
                # Get a specific lesson if `lesson_id` is provided
                lesson = (
                    Lesson.objects.filter(id=lesson_id, user=user_id)
                    .values("id", "title", "content")
                    .first()
                )

                if lesson:
                    return JsonResponse({"lesson": lesson}, status=200)
                else:
                    return JsonResponse({"error": "Lesson not found"}, status=404)

            return JsonResponse({"error": "missing lesson"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class DeleteFavouriteLesson(View):
    @verify_jwt
    def delete(self, req, payload, *args, **kwargs):
        try:
            user_id = payload["_id"]
            data = json.loads(req.body)
            lesson_id = data.get("lesson_id")

            if not lesson_id:
                return JsonResponse({"error": "Missing lesson_id"}, status=400)

            # Try to get the lesson
            lesson = Lesson.objects.filter(_id=lesson_id, user=user_id).first()

            if not lesson:
                return JsonResponse({"error": "Lesson not found"}, status=404)

            # Delete the lesson
            lesson.delete()

            return JsonResponse({"message": "Lesson deleted successfully"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
