from django.shortcuts import redirect, render, resolve_url
import requests
from bs4 import BeautifulSoup
import pandas as pd
from konlpy.tag import Okt
import re

import openai
OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY

df = pd.read_csv('./learnwor/sc_dataset3.csv', encoding='utf-8')
hw_list=[]

def fetch_news_article(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            # 'id' 속성을 이용해 원하는 뉴스 본문 부분을 찾습니다.
            article_div = soup.find('div', id='newsct_article')
            if article_div:
                return article_div.get_text(strip=False)  # 텍스트 추출 및 공백 제거
            else:
                return "Article content not found"
        else:
            return f"Failed to retrieve content, status code: {response.status_code}"
    except Exception as e:
        return f"Error fetching the news article: {e}"
    


def find_and_replace(input_sentence):
    okt = Okt() 
    words = okt.morphs(input_sentence)  # 문장을 형태소 단위로 분리

    # 어려운 단어를 찾아서 대체
    for i in range(len(words)):
        if words[i] in df['hard_word'].values:
            index = df[df['hard_word'] == words[i]].index[0]
            easy_word = df.at[index, 'easy_word']
            hw_list.append(words[i])
            words[i] = easy_word

    output_sentence = ' '.join(words)

    # return output_sentence
    
    #openai 활용
    messages = []
    content = output_sentence

    messages.append({"role": "user", "content": content + "문장 어색한 부분만 수정해"})

    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    chat_response = completion.choices[0].message.content

    return chat_response


def index(request):
    before_news = "" #원문 변수 선언
    after_news="" # 수정된 문장 변수 선언

    if request.method == 'POST':
        print('post 성공')
        before_news = fetch_news_article(request.POST['inputLink'])

        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', before_news)
        modified_paragraph = ' '.join(find_and_replace(sentence) for sentence in sentences)
        after_news = modified_paragraph
        return render(request, 'learnwor/home.html', {'before_news': before_news, 'after_news': after_news})

    return render(request, 'learnwor/home.html', {'before_news': before_news, 'after_news': after_news})


def login(request):
    return render(request, 'learnwor/login.html')

def signup(request):
    return render(request, 'learnwor/signup.html')
