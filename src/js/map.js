import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

let map;
window.clusterGroup = null;
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
  window.clusterGroup = clusterGroup;
}

function updateMarkers(locations = []) {
  if (!map || !clusterGroup) {
    return;
  }

  clusterGroup.clearLayers();
  window.mapMarkers = {};

  const markers = locations
    .filter((loc) => loc.lat != null && loc.lng != null && !isNaN(loc.lat) && !isNaN(loc.lng))
    .map((loc) => {
      const color = loc.color || '#000';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
        background:${color};
        width:28px;
        height:28px;
        border:2px solid var(--color-ink);
        box-shadow:3px 3px 0 0 var(--color-ink);
      "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon }).bindPopup(loc.popup || '');

      if (loc.id) {
        window.mapMarkers[loc.id] = marker;
      }

      return marker;
    });

  clusterGroup.addLayers(markers);

  if (markers.length > 0) {
    const bounds = clusterGroup.getBounds();
    map.fitBounds(bounds.pad(0.27));
  } else {
    map.setView([47.8, 7.6], 9);
  }
}

function focusMarker(id) {
  const marker = window.mapMarkers[id];
  const cluster = window.clusterGroup;
  if (!marker || !map || !cluster) {
    return;
  }

  cluster.zoomToShowLayer(marker, () => {
    const latlng = marker.getLatLng();
    map.setView(latlng, 10, { animate: true });
    marker.openPopup();
  });
}

window.initMap = initMap;
window.updateMarkers = updateMarkers;
window.focusMarker = focusMarker;
