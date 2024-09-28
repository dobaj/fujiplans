from django.http import HttpResponse


def login(req):
    return HttpResponse("login")

def signup(req):
    return HttpResponse("signup")

