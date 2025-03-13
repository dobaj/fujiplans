import uuid
from django.http import JsonResponse
from django.views import View
from utils import GoogleCloudStorage, handle_uploaded_file
from django.core.exceptions import ValidationError
from .models import Post
from users.models import User
from utils import verify_jwt


class PostView(View):
    # Create new post with pdf file
    @verify_jwt
    def post(self, req, payload):
        try:
            user = User.objects.filter(_id=payload["_id"]).first()

            if not user:
                return JsonResponse({"message": "User not found"}, status=404)

            description = req.POST.get("description")
            if not description:
                return JsonResponse(
                    {"message": "Please fill out all fields!"}, status=400
                )

            title = req.POST.get("title")
            if not title:
                return JsonResponse(
                    {"message": "Please fill out all fields!"}, status=400
                )

            if "pdfFile" in req.FILES:
                pdfFile = req.FILES["pdfFile"]
            else:
                return JsonResponse({"message": "Please upload a file!"}, status=400)

            try:
                # Validate and process the file
                file_metadata = handle_uploaded_file(pdfFile)

                gcs = GoogleCloudStorage()

                # Upload the file to Google Cloud Storage
                upload_result = gcs.upload_file(
                    pdfFile,
                    # Make file path unique
                    destination_path=f"lessons/{uuid.uuid4()}_{file_metadata['name']}",
                    content_type=file_metadata["type"],
                )

                post = Post.objects.create(
                    user=user,
                    description=description,
                    pdf_file=upload_result["path"],  # Store the path in the bucket
                    gcs_url=upload_result["url"],
                    subject=req.POST.get("subject") or user.subject,
                )

                return JsonResponse(
                    {
                        "message": "Post created successfully!",
                    },
                    status=201,
                )

            except ValidationError as e:
                return JsonResponse({"error": str(e)}, status=400)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    def get(self, req):
        try:
            posts = Post.objects.all()
            # Convert posts to a list of dictionaries
            posts_data = []
            for post in posts:
                posts_data.append(
                    {
                        "_id": str(post._id),
                        "description": post.description,
                        "title": post.title,
                        "subject": post.subject,
                        "gcs_url": post.gcs_url,
                        "created_at": post.created_at.isoformat(),
                        "poster": {
                            "_id": str(post.user._id),
                            "first_name": post.user.first_name,
                            "last_name": post.user.last_name,
                            "school": post.user.school,
                        },
                    }
                )

            return JsonResponse({"status": "success", "data": posts_data}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
