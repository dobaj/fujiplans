from django.urls import path
from .views import LessonView, GetLessonView, MDConvert, UpdateLesson, GetFavouriteLessons, GetFavouriteLesson, DeleteFavouriteLesson

urlpatterns = [
    path('', LessonView.as_view(), name='lesson'),
    path('getLesson', GetLessonView.as_view(), name='getLesson'),
    path('convertMD', MDConvert.as_view(), name='convertMD'),
    path('updateLesson', UpdateLesson.as_view(), name="updateLesson"),
    path('getFavourites', GetFavouriteLessons.as_view(), name="getFavourites"),
    path('getFavourite', GetFavouriteLesson.as_view(), name="getFavourite"),
    path('deleteFavourite', DeleteFavouriteLesson.as_view(), name="deleteFavourite")
]