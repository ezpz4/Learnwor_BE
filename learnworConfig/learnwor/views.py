from django.shortcuts import redirect, render, resolve_url
import requests
from bs4 import BeautifulSoup
import pandas as pd
from konlpy.tag import Okt
import re

import openai
OPENAI_API_KEY = "key"
openai.api_key = OPENAI_API_KEY

df = pd.read_csv('./learnwor/sc_dataset3.csv', encoding='utf-8')
# hw_list=[]

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
    hw_list = []  # 바뀐 단어를 추적하는 리스트

    # 어려운 단어를 찾아서 대체
    for i in range(len(words)):
        if words[i] in df['hard_word'].values:
            index = df[df['hard_word'] == words[i]].index[0]
            easy_word = df.at[index, 'easy_word']
            hw_list.append((words[i], easy_word))  # 바뀐 단어와 쉬운 단어를 튜플로 추가
            words[i] = easy_word

    output_sentence = ' '.join(words)
    
    #openai 활용
    messages = []
    content = output_sentence

    messages.append({"role": "user", "content": content + "문장이 어색한 것을 고쳐줘."})

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    chat_response = completion.choices[0].message.content

    return chat_response, hw_list


def index(request):
    before_news = "" #원문 변수 선언
    after_news="" # 수정된 문장 변수 선언

    highlighted_before_news=""
    highlighted_after_news=""
    modified_translated_text=""
    
    changed_words_list = []  # 변경된 단어 목록
    unique_changed_words_list = []
    html_table = []

    if request.method == 'POST':
        print('post 성공')
        before_news = fetch_news_article(request.POST['inputLink'])

        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', before_news)
        modified_sentences = []  # 수정된 문장들을 저장할 리스트

        for sentence in sentences:
            modified_sentence, changed_words = find_and_replace(sentence)
            modified_sentences.append(modified_sentence)
            changed_words_list.extend(changed_words)  # 변경된 단어들을 리스트에 추가

        after_news = ' '.join(modified_sentences)  # 수정된 문장들을 결합

        # 중복 제거 (단어의 순서 유지)
        unique_changed_words_list = list(dict.fromkeys(changed_words_list))

        # HTML 테이블 생성
        html_table = generate_html_table(unique_changed_words_list)

        # 중복 제거 후 변경된 단어 목록 준비
        unique_changed_words = list(dict.fromkeys(changed_words_list))
        original_words = [word[0] for word in unique_changed_words]  # 원래 단어 목록
        translated_words = [word[1] for word in unique_changed_words]  # 변경된 단어 목록

        # 원문과 번역문에서 변경된 단어 하이라이트
        highlighted_before_news = highlight_beford_words(before_news, original_words)
        highlighted_after_news = highlight_after_words(after_news, translated_words)

        # 마지막 문장을 제외하고 출력
        modified_translated_text = remove_last_sentence(highlighted_after_news)

        return render(request, 'learnwor/home.html', {
            'before_news': highlighted_before_news, 
            'after_news': modified_translated_text, 
            'words': html_table
        })

    return render(request, 'learnwor/home.html', {
            'before_news': highlighted_before_news, 
            'after_news': modified_translated_text, 
            'words': html_table
        })


from django.utils.safestring import mark_safe

def highlight_beford_words(text, words):
    for word in words:
        highlighted_word = f"<span class='Bhighlight'>{word}</span>"
        text = text.replace(word, highlighted_word)
    return mark_safe(text)  # Django 템플릿에서 안전한 HTML로 마크

def highlight_after_words(text, words):
    for word in words:
        highlighted_word = f"<span class='Ahighlight'>{word}</span>"
        text = text.replace(word, highlighted_word)
    return mark_safe(text)  # Django 템플릿에서 안전한 HTML로 마크

def remove_last_sentence(translated_text):
    # 문장을 분리합니다. 여기서는 '. '를 문장의 구분자로 가정합니다.
    # 더 정교한 분리가 필요하다면, 정규 표현식 등을 사용할 수 있습니다.
    sentences = translated_text.split('. ')
    
    # 마지막 문장을 제외한 모든 문장을 다시 결합합니다.
    # 마지막에 있는 문장만 제외하고, 나머지 문장에는 마침표를 다시 추가합니다.
    modified_text = '. '.join(sentences[:-1])
    
    return modified_text

def generate_html_table(tuple_list):
    html_table = "<table>\n"
    html_table += "  <thead>\n"
    html_table += "    <tr>\n"
    html_table += '      <th class="word1">단어</th>\n'
    html_table += "      <th>뜻</th>\n"
    html_table += "    </tr>\n"
    html_table += "  </thead>\n"
    html_table += "  <tbody>\n"

    for word, definition in tuple_list:
        html_table += "    <tr>\n"
        html_table += f'      <td class="word1">{word}</td>\n'
        html_table += f"      <td>{definition}</td>\n"
        html_table += "    </tr>\n"

    html_table += "  </tbody>\n"
    html_table += "</table>"

    
    return mark_safe(html_table)

def login(request):
    return render(request, 'learnwor/login.html')

def signup(request):
    return render(request, 'learnwor/signup.html')

def mypage(request):
    return render(request, 'learnwor/mypage.html')

def logout(request):
    return render(request, 'learnwor/login.html')