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
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    const auth = getAuth();

    document.getElementById('signupSubmitButton').addEventListener('click', async (event) => {
        //값을 가져옴
        var userName = document.getElementById('userName').value;        
        var userEmail = document.getElementById('userEmail').value;
        var userPassword = document.getElementById('userPassword').value;
        var confirmUserPassword = document.getElementById('confirmUserPassword').value;

        //빈칸 전부 입력했는지 확인
        if(userName == "" || userEmail == "" || userPassword == "" || confirmUserPassword == ""){
            alert("빈칸을 입력해주세요.")
            event.preventDefault()
        }else{
            //비밀번호 확인
            if(userPassword != confirmUserPassword){
                alert("비밀번호를 다시 입력해주세요.")
                event.preventDefault()
            }else{
                event.preventDefault()

                const email = document.getElementById('userEmail').value;
                const password = document.getElementById('userPassword').value;
                
                console.log(email)
                console.log(password)

                //회원가입
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => { 
                        console.log(userCredential)
                        console.log('회원가입 성공')
                        const user = userCredential.user;
                        //이메일 인증 후에 userName을 저장해야 하기 때문에 세션에 저장.
                        sessionStorage.setItem("userName", userName);

                        //회원가입 성공 시 이메일 전송.
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                console.log("이메일 성공")
                                //이메일 전송 성공 시 화면 바꾸기.
                                //window.location.href = "home.html";
                                // 서버 
                                window.location.href = 'http://127.0.0.1:8000/home/';
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(error.message)
                                console.log("이메일 실패")
                                event.preventDefault()
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error.message)
                        console.log('회원가입 실패')
                        event.preventDefault()
                    });
            }}
    })

    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };