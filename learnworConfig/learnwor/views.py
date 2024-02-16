from django.shortcuts import redirect, render, resolve_url
import sys
sys.path.append('../web')
from crawling import fetch_news_article

# Create your views here.

def index(request):
    before_news = "" #원문 변수 선언

    if request.method == 'POST':
        print('post 성공')
        before_news = fetch_news_article(request.POST['inputLink'])
        return render(request, 'learnwor/home.html', {'before_news': before_news})

    return render(request, 'learnwor/home.html')

def login(request):
    return render(request, 'learnwor/login.html')

def signup(request):
    return render(request, 'learnwor/signup.html')
