const session = sessionStorage.getItem("loggedIn");
console.log(session);

window.addEventListener('DOMContentLoaded', (event) => {
  // ������ �ε� �� ���� sessionStorage�� ���� Ȯ���մϴ�.
  const session = sessionStorage.getItem("loggedIn");
  const beforeLogin = document.getElementById("beforeLogin");
  const afterLogin = document.getElementById("afterLogin");
  
  if(session) { // loggedIn ���� �����ϴ� ���
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