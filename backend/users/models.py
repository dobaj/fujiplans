from django.db import models
import uuid

# Create your models here.

class User(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

