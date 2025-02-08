from django.urls import path
from .views import LessonView, GetLessonView, MDConvert

urlpatterns = [
    path('', LessonView.as_view(), name='lesson'),
    path('getLesson', GetLessonView.as_view(), name='getLesson'),
    path('convertMD', MDConvert.as_view(), name='convertMD')
]