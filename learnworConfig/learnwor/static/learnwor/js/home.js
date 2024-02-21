
const session = sessionStorage.getItem("loggedIn"); //user 객체 가져옴 -> 안가져와짐!
const beforeLogin = document.getElementById("beforeLogin");
const afterLogin = document.getElementById("afterLogin");

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


document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "/home/login";
});

document.getElementById("signupBtn").addEventListener("click", function() {
    window.location.href = "/home/signup";
});

document.getElementById("mypageBtn").addEventListener("click", function() {
    window.location.href = "/home/mypage";
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
        console.log(app)
        
//로그인 유저 확인하기
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, orderByChild, equalTo, get, query } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";   

const auth = getAuth();
const user = auth.currentUser;

const database = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const display = user.displayName;
        console.log(user)
        console.log(uid)
        console.log(display)
        /**이메일 인증 해야만 마이페이지, 로그아웃 보임.
         * 마이페이지 보여야 데이터베이스 사용할 수 있음.
         * 
        */
        if(user.displayName != null){
            //if(loggedIn . displayName != null) 도 되는지 확인해야 함. -> 안됨 오브젝트 타입 반환한다.
            beforeLogin.style.display = "none";
            afterLogin.style.display = "block";


            //데이터베이스 코드
            if(document.getElementById('beforeTranslate').textContent.trim() != "뉴스 원문이 입력됩니다."){
                var original_words = document.getElementById('beforeTranslate').getAttribute('data-original');
                var translated_words = document.getElementById('afterTranslate').getAttribute('data-translate');

                const usersRef = ref(database, 'users/' + uid);

                pushWordsToMypage(usersRef, original_words, translated_words);

                console.log(original_words)
                console.log(translated_words)
            }else{
                console.log('내용 없음')
            }

        }else{
            beforeLogin.style.display = "block";
            afterLogin.style.display = "none"; 
        }
    } else {
        beforeLogin.style.display = "block";
        afterLogin.style.display = "none"; 
    }
});

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

async function pushWordsToMypage(usersRef, original_words, translated_words){
    var original_array = original_words.substring(1, original_words.length - 1).split(',').map(function(item) {
        // 각 요소의 양쪽에 있는 홑따옴표를 제거합니다.
        return item.trim().replace(/^'(.*)'$/, '$1');
    });
    var translated_array = translated_words.substring(1, translated_words.length - 1).split(',').map(function(item) {
        // 각 요소의 양쪽에 있는 홑따옴표를 제거합니다.
        return item.trim().replace(/^'(.*)'$/, '$1');
    });

    for(var i=0; i<original_array.length; i++){
        var originalWord = original_array[i];
        var translatedWord = translated_array[i];

        await get(query(usersRef, orderByChild('original_word'), equalTo(originalWord)))
                .then((snapshot) => {
                        if(snapshot.exists()){
                            console.log("이미 존재")
                        }else{
                            push(usersRef, {
                            "original_word": originalWord,
                            "translated_word": translatedWord
                                }).then(()=>{
                                    console.log("저장 성공")
                                }).catch((error) => {
                                    console.log("저장 실패")
                                });
                        }
                }).catch((error) => {
                    
                });
    }

}