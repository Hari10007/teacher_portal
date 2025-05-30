setTimeout(function () {
  const alert = document.getElementById("login-alert");
  if (alert) {
    alert.classList.add("fade");
    alert.classList.remove("show");
    setTimeout(() => alert.remove(), 500);
  }
}, 3000);
