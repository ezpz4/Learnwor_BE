
const session = sessionStorage.getItem("loggedIn");


document.getElementById("inputLink").addEventListener('keydown', async (event) => {
    if(event.key == 'Enter'){
            showLoadingScreen();
    }
})

function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
    document.getElementById("loading-screen").style.position = "fixed";
    document.getElementById("loading-screen").style.flexDirection = "column";
}
console.log(session);

window.addEventListener('DOMContentLoaded', (event) => {
    const session = sessionStorage.getItem("loggedIn");
    const beforeLogin = document.getElementById("beforeLogin");
    const afterLogin = document.getElementById("afterLogin");

if(session) { 
    beforeLogin.style.display = "none";
    afterLogin.style.display = "block";
} else {
    beforeLogin.style.display = "block";
    afterLogin.style.display = "none";
}
});

document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "/home/login";
});

document.getElementById("signupBtn").addEventListener("click", function() {
    window.location.href = "/home/signup";
});

document.getElementById("mypageBtn").addEventListener("click", function() {
    window.location.href = "/home/mypage";
});

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
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    const display = user.displayName;
    console.log(user)
    console.log(uid)
    console.log(display)

    beforeLogin.style.display = "none";
    afterLogin.style.display = "block";
    // ...
    } else {
    // User is signed out
    // ...
    beforeLogin.style.display = "block";
    afterLogin.style.display = "none";
    
    }
});

document.getElementById("logoutBtn").addEventListener("click", async(event) => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Logout Success')

        window.location.href = 'http://127.0.0.1:8000/home/';
    }).catch((error) => {
        // An error happened.
    });
});