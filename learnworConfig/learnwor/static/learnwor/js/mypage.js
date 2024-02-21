document.getElementById("homeBtn").addEventListener("click", function() {
  window.location.href = "/home";
});

//기본 설정
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";     

        const firebaseConfig = {
            apiKey: "AIzaSyAUkBV_sZ59E5gpSv7mQpfV_eIpt6nOAE0",
            authDomain: "learnwor-aa74b.firebaseapp.com",
            projectId: "learnwor-aa74b",
            storageBucket: "learnwor-aa74b.appspot.com",
            messagingSenderId: "609292163867",
            appId: "1:609292163867:web:7120c8cb909d89946251be",
            databaseURL: "https://learnwor-aa74b-default-rtdb.firebaseio.com/",
        };
        
        const app = initializeApp(firebaseConfig);

        console.log('hello world')
        console.log(app)

//맞는 계정을 우선 가져와야 함.
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";   
const auth = getAuth();
const user = auth.currentUser;
const database = getDatabase();

console.log(user)
//계정에 맞는 페이지 구성.
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
    document.getElementById('nickName').innerHTML = user.displayName;
    const tbody = document.getElementById('tbody');

    //단어 삭제

    //단어 출력
    //uid 가져옴
    const usersRef = ref(database, 'users/' + user.uid);

    get(usersRef)
      .then((snapshot) => {
        const userData = snapshot.val();
        console.log(userData)

        Object.keys(userData).forEach((key) =>{
          const originalWord = userData[key].original_word;
          const translatedWord = userData[key].translated_word;
          
          const tr = document.createElement('tr');

          const original = document.createElement('td');
          original.className = 'word';
          original.textContent = originalWord;
          tr.appendChild(original);

          const translate = document.createElement('td');
          translate.textContent = translatedWord;
          tr.append(translate);

          tbody.appendChild(tr);

          console.log('Key: ' + key + ', OriginalWord: ' + originalWord + 'TranslatedWord: ' + translatedWord)



        });

      })
      .catch((error) => {
        console.log("오류")
      });
  }
})

//로그아웃
document.getElementById("logoutBtn").addEventListener("click", async(event) => {
  signOut(auth).then(() => {
      console.log('Logout Success')
      sessionStorage.clear();
      window.location.href = 'http://127.0.0.1:8000/home/';
  }).catch((error) => {
      console.log('Logout Fail')
  });
});