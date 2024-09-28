from django.db import models

# Create your models here.

class User(models.Model):
    email = models.EmailField
    password = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)