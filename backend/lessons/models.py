from django.db import models

from users.models import User


# Create your models here.
class Lesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()  # Stores Markdown content
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
