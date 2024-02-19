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

import { getAuth, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

    document.getElementById('loginSubmitButton').addEventListener('click', async (event) => {
        /**
        * 25번 ~ 27번 확인용 코드
        * null 나오면 됩니다.
        */
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user);
            
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
                    event.preventDefault()

                    console.log(userCredential)
                    console.log('로그인 성공')

                    const user = userCredential.user;
                    //이 부분 수정?
                    sessionStorage.setItem("loggedIn", true);
    
                    /**
                    * 이메일 유효한 경우
                    * 이름을 설정합니다.
                    * 아까 세션에 저장한 이름으로 설정합니다.
                    */
                    if(user.emailVerified == true){
                        updateProfile(auth.currentUser, {
                            displayName: sessionStorage.getItem("userName")
                        })
                        .then(() => {
                            event.preventDefault()
                            user.displayName = sessionStorage.getItem("userName");
                            console.log("회원 이름 설정 성공")
                            console.log(user.displayName)
                            //화면 바꾸기
                            //window.location.href = "home.html";
                            window.location.href = 'http://127.0.0.1:8000/home/';
                        })
                        .catch((error) => {
                            console.log("회원 이름 설정 실패")
                            event.preventDefault()
                        });
                    }else{
                        alert("이메일 인증 필요. 로그인 실패");
                        event.preventDefault()
                    }
                })
                .catch((error) => {
                    console.log('로그인 실패')
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    event.preventDefault()
                });
            }
    })

    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };