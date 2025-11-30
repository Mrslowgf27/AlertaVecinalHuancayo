// Leer token y usuario desde localStorage
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

// Si hay usuario logueado → mostrar “Salir”
// Si NO hay usuario → mostrar Login / Registro
let menu = `
  <a href="index.html">Inicio</a>
  <a href="mapa.html">Mapa</a>
  <a href="alertas.html">Alertas</a>
`;

if (token) {
  menu += `
    <a href="perfil.html">Perfil</a>
    <a href="#" id="logoutBtn">Salir</a>
  `;
} else {
  menu += `
    <a href="login.html">Login</a>
    <a href="register.html">Registro</a>
  `;
}

document.getElementById("menu").innerHTML = menu;

// Evento de cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("logoutBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Sesión cerrada");
      location.href = "login.html";
    });
  }
});
