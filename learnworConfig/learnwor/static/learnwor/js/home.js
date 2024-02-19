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

document.getElementById("logoutBtn").addEventListener("click", function() {
    window.location.href = "/home/login";
});
