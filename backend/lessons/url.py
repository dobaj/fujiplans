from django.urls import path
from .views import LessonView

urlpatterns = [
    path('', LessonView.as_view(), name='lesson'),
]