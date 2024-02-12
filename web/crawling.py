import requests
from bs4 import BeautifulSoup

# url = "https://news.naver.com/section/101"

# response = requests.get(url)

# soup = BeautifulSoup(response.text, 'html.parser')

# links = soup.find_all('a')

# for link in links:
#     print(link.get('href'))

def fetch_news_article(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            # 'id' 속성을 이용해 원하는 뉴스 본문 부분을 찾습니다.
            article_div = soup.find('div', id='newsct_article')
            if article_div:
                return article_div.get_text(strip=True)  # 텍스트 추출 및 공백 제거
            else:
                return "Article content not found"
        else:
            return f"Failed to retrieve content, status code: {response.status_code}"
    except Exception as e:
        return f"Error fetching the news article: {e}"

# 사용 예시
url = "https://n.news.naver.com/mnews/article/243/0000056255"  # 크롤링하고 싶은 URL
article_content = fetch_news_article(url)
print(article_content)