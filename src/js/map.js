import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

let map;
let clusterGroup = null;
let mapReady = false;
window.mapMarkers = {};

function initMap() {
  map = L.map('map').setView([47.8, 7.6], 9);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);

  clusterGroup = L.markerClusterGroup({
    iconCreateFunction(cluster) {
      const count = cluster.getChildCount();
      return L.divIcon({
        className: 'custom-cluster',
        html: `<div style="
          background:var(--color-canvas);
          color:var(--color-ink);
          width:40px;
          height:40px;
          border:2px solid var(--color-ink);
          box-shadow:3px 3px 0 0 var(--color-ink);
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:900;
          font-size:15px;
          font-family:monospace;
        ">${count}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
    },
  });
  map.addLayer(clusterGroup);

  const markersEl = document.getElementById('map-markers');
  if (markersEl) {
    updateMarkers(false);
    mapReady = true;
    new MutationObserver(() => updateMarkers(true)).observe(markersEl, { childList: true });
  }
}

function updateMarkers(scroll = false) {
  if (!map || !clusterGroup) return;

  const locations = [...document.querySelectorAll('#map-markers [data-lat]')].map((el) => ({
    id: el.dataset.id,
    title: el.dataset.title || '',
    lat: parseFloat(el.dataset.lat),
    lng: parseFloat(el.dataset.lng),
    color: el.dataset.color || '#000',
    popup: el.querySelector('template')?.innerHTML || '',
  }));

  clusterGroup.clearLayers();
  window.mapMarkers = {};

  const markers = locations
    .filter((loc) => !isNaN(loc.lat) && !isNaN(loc.lng))
    .map((loc) => {
      const markerLabel = loc.title ? `Show location for ${loc.title}` : 'Show location';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
        background:${loc.color};
        width:28px;
        height:28px;
        border:2px solid var(--color-ink);
        box-shadow:3px 3px 0 0 var(--color-ink);
      "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([loc.lat, loc.lng], {
        icon,
        title: markerLabel,
      }).bindPopup(loc.popup);

      marker.on('add', () => {
        const el = marker.getElement();

        if (!el) {
          return;
        }

        el.setAttribute('aria-label', markerLabel);
      });

      if (loc.id) {
        window.mapMarkers[loc.id] = marker;
      }

      return marker;
    });

  clusterGroup.addLayers(markers);

  if (markers.length > 0) {
    map.fitBounds(clusterGroup.getBounds().pad(0.27));
  } else {
    map.setView([47.8, 7.6], 9);
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function focusMarker(id) {
  const marker = window.mapMarkers[id];
  if (!marker || !map || !clusterGroup) return;

  clusterGroup.zoomToShowLayer(marker, () => {
    map.setView(marker.getLatLng(), 10, { animate: true });
    marker.openPopup();
  });
}

window.initMap = initMap;
window.focusMarker = focusMarker;
