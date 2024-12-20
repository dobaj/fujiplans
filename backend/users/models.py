from django.db import models
import uuid

# Create your models here.

class User(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=100, null=True, blank=True, editable=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ID: {self._id}, Name: {self.name}, Email: {self.email}"

