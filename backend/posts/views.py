import json
import uuid
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View
from utils import GoogleCloudStorage, handle_uploaded_file
from dotenv import load_dotenv
from django.core.exceptions import ValidationError
from .models import Post
from users.models import User
from utils import verify_jwt

# TODO: Implement retrieval of posts
class PostView(View):

    # TODO: Implement markdown content handling
    # Create new post with pdf file and markdown content
    @verify_jwt
    def post(self, req, payload):
        try:

            user = User.objects.filter(_id=payload["_id"]).first()

            if not user:
                return JsonResponse({"message": "User not found"}, status=404)

            description = req.POST.get('description')
            if not description:
                return JsonResponse({"message": "Please fill out all fields!"}, status=400)

            if 'pdfFile' in req.FILES:
                pdfFile = req.FILES['pdfFile']
            elif 'markdownContent' in req.POST:
                generatePdf = req.POST.get('generatePdf') == 'true'
            else:
                return JsonResponse({"message": "Please upload a file or provide markdown content!"}, status=400)

            try:
                # Validate and process the file
                file_metadata = handle_uploaded_file(pdfFile)

                gcs = GoogleCloudStorage()

                # Upload the file to Google Cloud Storage
                upload_result = gcs.upload_file(
                    pdfFile,
                    destination_path=f"lessons/{uuid.uuid4()}_{file_metadata['name']}",
                    content_type=file_metadata['type']
                )

                post = Post.objects.create(
                    user=user,
                    description=description,
                    pdf_file=upload_result['path'],  # Store the path in the bucket
                    original_filename=file_metadata['name'],
                    gcs_url=upload_result['url']
                )

                return JsonResponse({
                    "_id": str(post._id),
                    "description": post.description,
                    "pdf_url": post.gcs_url,
                    "created_at": post.created_at.isoformat(),
                    "user": {
                        "id": str(user._id),
                        "name": user.first_name
                    }
                }, status=201)

            except ValidationError as e:
                return JsonResponse({"error": str(e)}, status=400)

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"message": str(e)}, status=400)

    def get(self, req):
        try:
            return JsonResponse({"message": "GET request to the post view"})
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
