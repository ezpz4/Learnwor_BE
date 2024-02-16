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


import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email;
        console.log(email)

        const existingElement = document.getElementById('loginForm');
        existingElement.style.display = 'none';

        const emailElement = document.createElement('h2');
        emailElement.textContent = email;
        document.body.appendChild(emailElement);


    // ...
    } else {
    // User is signed out
    // ...
        console.log('이메일 없음')
    }
});
