from django.urls import path
from .views import GetLessonView, MDConvert

urlpatterns = [
    path('getLesson/', GetLessonView.as_view(), name='getLesson'),
    path('convertMD/', MDConvert.as_view(), name='convertMD')
]
