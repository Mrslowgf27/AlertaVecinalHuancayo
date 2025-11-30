// URL DEL BACKEND EN RENDER
const API = "https://alertavecinalhuancayo.onrender.com/api/auth";

document.addEventListener("DOMContentLoaded", () => {

  const login = document.getElementById("loginForm");
  if (login) {
    login.addEventListener("submit", async e => {
      e.preventDefault();

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });

      const data = await res.json();
      console.log("LOGIN:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login correcto");
        location.href = "index.html";
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    });
  }

  const register = document.getElementById("registerForm");
  if (register) {
    register.addEventListener("submit", async e => {
      e.preventDefault();

      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value
        })
      });

      const data = await res.json();
      console.log("REGISTER:", data);

      if (res.ok) {
        alert("Registro exitoso");
        location.href = "login.html";
      } else {
        alert(data.message || "Error al registrarse");
      }
    });
  }

});
