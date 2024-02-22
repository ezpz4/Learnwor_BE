### How to run LEARNWOR 

1. git clone this BE repository
2. Connect to [OpenAI API](https://platform.openai.com/api-keys) and create a secret key.
3. insert the created secret key into OPENAI_API_KEY on line 9 of views.py.
4. execute source venv/bin/activate. (If you don't have virtual environments, you should make one)
5. cd learnworConfig and run the django server.
6. connect to http://127.0.0.1:8000/home/ and enjoy the service.

### Make sure when you choose the news to transform, you can insert news link only in [this page](https://news.naver.com/section/101). 

------

If you have JVM error, run below.</br>
**export JAVA_HOME=$(/usr/libexec/java_home)
echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.bash_profile**
