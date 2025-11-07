// app.js

let map;                 // referencia al mapa
let addMode = false;     // si true, al hacer clic en el mapa se añade marcador

// Función llamada por Google Maps al cargar (callback)
function initMap() {
  const bogota = { lat: 4.60971, lng: -74.08175 };

map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 4.60971, lng: -74.08175 }, // Bogotá
  zoom: 12,
  streetViewControl: true,   // ✅ Activa el muñequito
  mapTypeControl: true,      // ✅ Control de tipo de mapa (satélite, etc.)
  fullscreenControl: true    // ✅ Botón de pantalla completa
});


  // Marcador inicial (opcional)
  new google.maps.Marker({
    position: bogota,
    map: map,
    title: "Bogotá"
  });

  // Listener del mapa para añadir marcador cuando estamos en "addMode"
  map.addListener("click", (e) => {
    if (!addMode) return;
    addMarkerAt(e.latLng);
    // Si quieres permitir solo un marcador por activación: descomenta lo siguiente
    // toggleAddMode(false);
  });

  // Botón que activa/desactiva el modo añadir marcador con clic
  const btn = document.getElementById("btnMarker");
  btn.addEventListener("click", () => {
    toggleAddMode(!addMode);
  });
}

// Función para alternar modo y actualizar texto/estilo del botón
function toggleAddMode(value) {
  addMode = value;
  const btn = document.getElementById("btnMarker");
  if (addMode) {
    btn.classList.add("active");
    btn.textContent = "✅ Haz clic en el mapa para añadir marcador";
  } else {
    btn.classList.remove("active");
    btn.textContent = "🖱️ Activar: añadir marcador con clic";
  }
}

// Añade un marcador arrastrable en la posición dada
function addMarkerAt(latLng) {
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true
  });

  // Popup (InfoWindow) con coordenadas
  const info = new google.maps.InfoWindow({
    content: `<div><strong>Marcador</strong><br>Lat: ${latLng.lat().toFixed(5)}<br>Lng: ${latLng.lng().toFixed(5)}</div>`
  });

  marker.addListener("click", () => info.open(map, marker));
  // Abrir la ventana al crear
  info.open(map, marker);

  

  // (Opcional) Si quieres almacenar coordenadas o mostrarlas en una lista,
  // aquí puedes añadir la lógica para guardarlas en un array o en el DOM.
}

// Exponer initMap globalmente (no necesario si usas la carga con callback en script URL)
// window.initMap = initMap;