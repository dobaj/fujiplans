
from django.http import HttpResponse

def homepage(req):
    return HttpResponse("Hello world")

def login(req):
    return HttpResponse("login page")

def signup(req):
    return HttpResponse("signup page")