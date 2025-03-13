from django.db import models
import uuid
from users.models import User

class Post(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField()

    # Store PDF file reference
    pdf_file = models.FileField(upload_to='lessons/%Y/%m/%d/', null=True, blank=True)

    # Store original markdown if applicable
    markdown_content = models.TextField(null=True, blank=True)

    original_filename = models.CharField(max_length=255, blank=True)

    # URL for direct access to the file in GCS
    gcs_url = models.URLField(max_length=1000, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    view_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']
