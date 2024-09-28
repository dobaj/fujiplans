
from django.http import HttpResponse

def homepage(req):
    return HttpResponse("Hello world")