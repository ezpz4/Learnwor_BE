from django.shortcuts import render

# Create your views here.

def index(request):

    return render(request, 'learnwor/home.html')

def login(request):
    return render(request, 'learnwor/login.html')

def signup(request):
    return render(request, 'learnwor/signup.html')
