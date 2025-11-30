// frontend/js/auth.js
const API = "https://alertavecinalhuancayo.onrender.com/api/auth";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
        LOGIN
  ===================== */
  const login = document.getElementById("loginForm");

  if (login) {
    login.addEventListener("submit", async e => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("LOGIN:", data);

      if (data.token) {
        // Guardar token y usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Inicio de sesión correcto");
        location.href = "index.html";
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    });
  }

  /* =====================
        REGISTER
  ===================== */
  const register = document.getElementById("registerForm");

  if (register) {
    register.addEventListener("submit", async e => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      console.log("REGISTER:", data);

      if (res.ok) {
        alert("Registro exitoso");
        location.href = "login.html";
      } else {
        alert(data.error || "Error al registrarse");
      }
    });
  }
});
