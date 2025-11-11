const form = document.getElementById('formReporte');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const reporte = {
      tipo: document.getElementById('tipo').value,
      descripcion: document.getElementById('descripcion').value,
      ubicacion: document.getElementById('ubicacion').value,
      fecha: new Date().toLocaleString()
    };
    let reportes = JSON.parse(localStorage.getItem('reportes')) || [];
    reportes.push(reporte);
    localStorage.setItem('reportes', JSON.stringify(reportes));
    alert('✅ Alerta registrada correctamente');
    form.reset();
  });
}
const mapContainer = document.getElementById('map');
if (mapContainer) {
  const map = L.map('map').setView([-12.0651, -75.2049], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  const reportes = JSON.parse(localStorage.getItem('reportes')) || [];
  reportes.forEach(r => {
    L.marker([-12.0651 + Math.random()/100, -75.2049 + Math.random()/100])
      .addTo(map)
      .bindPopup(`<b>${r.tipo}</b><br>${r.descripcion}<br><i>${r.fecha}</i>`);
  });
}