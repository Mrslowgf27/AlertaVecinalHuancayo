const API = "http://localhost:4000/api/auth";

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
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login correcto");
        location.href = "index.html";
      } else {
        alert("Credenciales incorrectas");
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
      alert("Registro exitoso");
      location.href = "login.html";
    });
  }

});
