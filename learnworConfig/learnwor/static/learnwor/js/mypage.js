document.getElementById("homeBtn").addEventListener("click", function() {
  window.location.href = "/home";
});

// initialize
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

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();
const nickname = document.getElementById("nickName")

onAuthStateChanged(auth, (user) => {
  if (user) {
    nickname.textContent = user.displayName || '알 수 없는 사용자'; // displayName이 없는 경우 대체 텍스트 사용
    console.log(user.displayName);
  } else {
    nickname.textContent = '알 수 없는 사용자';
    console.log('사용자가 로그인하지 않았습니다.');
  }
});
// 로그아웃 
document.getElementById("logoutBtn").addEventListener("click", async(event) => {
  signOut(auth).then(() => {
      // Sign-out successful.
      console.log('로그아웃 성공')
      window.location.href = 'http://127.0.0.1:8000/home/';
  }).catch((error) => {
      // An error happened.
      console.error('로그아웃 에러', error);
  });
});