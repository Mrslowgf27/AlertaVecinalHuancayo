document.addEventListener("DOMContentLoaded", () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Si no hay sesión, no debería estar aquí
  if (!user || !token) {
    alert("Debes iniciar sesión");
    location.href = "login.html";
    return;
  }

  // Mostrar datos del usuario
  document.getElementById("p_name").textContent = user.name;
  document.getElementById("p_email").textContent = user.email;
  document.getElementById("p_role").textContent = user.role;

  // Botón cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Sesión finalizada");
    location.href = "login.html";
  });

});
