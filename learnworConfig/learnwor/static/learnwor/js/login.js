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

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

    document.getElementById('loginSubmitButton').addEventListener('click', async (event) => {
        //로그인
        var userEmail = document.getElementById('userEmail').value;
        var userPassword = document.getElementById('userPassword').value;

        if(userEmail == "" || userPassword == ""){
            alert("빈칸을 입력해주세요.")
            event.preventDefault()
        }else{
            event.preventDefault()
            const email = document.getElementById('userEmail').value
            const password = document.getElementById('userPassword').value
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    console.log('로그인 성공')
                    const user = userCredential.user;
                    sessionStorage.setItem("loggedIn", email);
                    const session = sessionStorage.getItem("loggedIn");
                    console.log(session);
                    window.location.href = 'http://127.0.0.1:8000/home/';
                })
                .catch((error) => {
                    console.log('로그인 실패')
                    alert("로그인 실패")
                    if(email == null){
                        console.log('이메일 없음')
                    }
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    })

    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };