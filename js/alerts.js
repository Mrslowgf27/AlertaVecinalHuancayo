// URL del backend en Render
const API = "https://alertavecinalhuancayo.onrender.com/api/alerts";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("alertList");

  fetch(API, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(r => r.json())
  .then(data => {
    list.innerHTML = data.map(a =>
      `<div class="alerta">
         <h3>${a.title}</h3>
         <p>${a.description}</p>
       </div>`
    ).join("");
  });

  const form = document.getElementById("alertForm");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          title: title.value,
          description: description.value
        })
      });

      alert("Alerta creada");
      location.reload();
    });
  }
});
