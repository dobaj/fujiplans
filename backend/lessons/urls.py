from django.urls import path
from .views import (
    GetLessonView,
    HTMLConvert,
    UpdateLesson,
    GetFavouriteLessons,
    GetFavouriteLesson,
    DeleteFavouriteLesson,
)

urlpatterns = [
    path("getLesson/", GetLessonView.as_view(), name="getLesson"),
    path("convertHTML/", HTMLConvert.as_view(), name="convertHTML"),
    path("updateLesson", UpdateLesson.as_view(), name="updateLesson"),
    path("getFavourites", GetFavouriteLessons.as_view(), name="getFavourites"),
    path("getFavourite", GetFavouriteLesson.as_view(), name="getFavourite"),
    path("deleteFavourite", DeleteFavouriteLesson.as_view(), name="deleteFavourite"),
]
