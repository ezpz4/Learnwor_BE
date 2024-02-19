const session = sessionStorage.getItem("loggedIn");
console.log(session);

window.addEventListener('DOMContentLoaded', (event) => {
  // 페이지 로드 시 마다 sessionStorage의 값을 확인합니다.
  const session = sessionStorage.getItem("loggedIn");
  const beforeLogin = document.getElementById("beforeLogin");
  const afterLogin = document.getElementById("afterLogin");
  
  if(session) { // loggedIn 값이 존재하는 경우
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