//기본 설정
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        
        const firebaseConfig = {
            apiKey: "AIzaSyAUkBV_sZ59E5gpSv7mQpfV_eIpt6nOAE0",
            authDomain: "learnwor-aa74b.firebaseapp.com",
            projectId: "learnwor-aa74b",
            storageBucket: "learnwor-aa74b.appspot.com",
            messagingSenderId: "609292163867",
            appId: "1:609292163867:web:7120c8cb909d89946251be"
        };
        
        const app = initializeApp(firebaseConfig);

        console.log('hello world')
        console.log(app)


//회원가입
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    const auth = getAuth();

    document.getElementById('signupSubmitButton').addEventListener('click', async (event) => {
        event.preventDefault()
        const email = document.getElementById('userEmail').value
        const password = document.getElementById('userPassword').value
        //const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value
    
        console.log(email)
        console.log(password)

        //회원가입
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { 
                console.log(userCredential)
                console.log('회원가입 성공')
                const user = userCredential.user;
                window.location.href = 'http://127.0.0.1:8000/home/';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
            });
    })

    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };

    /*
    async function sendPostRequest(email, password, csrfToken) {
        const response = await fetch('http://127.0.0.1:8000/learnworHome/signup', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
    
        if (response.ok) {
            console.log('POST request succeeded');
            // 리디렉션
            window.location.href = 'http://127.0.0.1:8000/learnworHome/';
        } else {
            console.error('POST request failed');
        }
    }
    */
