document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map").setView([-16.3989, -71.5350], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

});
