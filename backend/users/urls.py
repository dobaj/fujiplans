from django.urls import path
from . views import LoginView, RegisterView, RefreshView, UserView, GoogleOauth

urlpatterns = [
    path('', UserView.as_view(), name='user'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('refresh/', RefreshView.as_view(), name='refresh'),
    path('oauth/google/', GoogleOauth.as_view(), name='google_oauth')
]
