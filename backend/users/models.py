from django.db import models
import uuid

# Create your models here.


class User(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=100, null=True, blank=True, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    school = models.CharField(max_length=255, blank=False, default="Unknown")

    def __str__(self):
        return f"ID: {self._id}, first_name: {self.first_name}, last_name: {self.last_name}, Email: {self.email}"


# Basically same as Post model lol
class Favourites(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favourites")
    pdf_file = models.CharField(max_length=500, blank=False)
    original_filename = models.CharField(max_length=255, blank=False)
    subject = models.CharField(max_length=255, blank=False, default="English")
    gcs_url = models.URLField(max_length=1000, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
