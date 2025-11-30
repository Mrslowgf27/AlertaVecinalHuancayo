document.addEventListener("DOMContentLoaded", () => {
  
  // Evita errores si el DIV #map no existe en alguna página
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // Centro del mapa (Huancayo, por ejemplo)
  const map = L.map("map").setView([-12.0683, -75.2100], 14);

  // Capa base de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

});
