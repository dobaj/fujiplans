from django.db import models
import uuid
from users.models import User


class Post(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")

    title = models.CharField(max_length=255, blank=False)
    description = models.TextField()

    # Store PDF file reference path
    pdf_file = models.CharField(max_length=500, blank=False)

    subject = models.CharField(max_length=255, blank=False, default="English")

    # URL for direct access to the file in GCS
    gcs_url = models.URLField(max_length=1000, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
