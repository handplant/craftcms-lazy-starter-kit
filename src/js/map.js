import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

let map
window.clusterGroup = null
window.mapMarkers = {}

function initMap () {
  map = L.map('map').setView([47.8, 7.6], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map)

  clusterGroup = L.markerClusterGroup()
  map.addLayer(clusterGroup)
  window.clusterGroup = clusterGroup
}

function updateMarkers (locations = []) {
  if (!map || !clusterGroup) {
    return
  }

  clusterGroup.clearLayers()
  window.mapMarkers = {}

  const markers = locations.map(loc => {
    const color = loc.color || categoryColors['#000']

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background:${color};
        width:30px;
        height:30px;
        border-radius:50%;
        border:2px solid white;
        box-shadow:0 0 2px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    const popupHtml = `
      <div class="ui-popup__wrapper">
        ${loc.image ? `
          <div class="ui-popup__image">
            <img src="${loc.image}" alt="${loc.title}" style="aspect-ratio:2/1;object-fit:cover;">
          </div>` : ''}
        <div class="ui-popup__content">
          <span class="ui-bold">${loc.category}</span>
          <strong>${loc.title}</strong>
          ${loc.url ? `<a href="${loc.url}" class="ui-link">Read more →</a>` : ''}
        </div>
      </div>
    `.trim()

    const marker = L.marker([loc.lat, loc.lng], { icon })
      .bindPopup(popupHtml, { className: 'ui-popup' })

    if (loc.id) {
      window.mapMarkers[loc.id] = marker
    }

    return marker
  })

  clusterGroup.addLayers(markers)

  if (markers.length > 0) {
    const bounds = clusterGroup.getBounds()
    map.fitBounds(bounds.pad(0.27))
  } else {
    map.setView([47.8, 7.6], 9)
  }
}

function focusMarker (id) {
  const marker = window.mapMarkers[id]
  const cluster = window.clusterGroup
  if (!marker || !map || !cluster) {
    return
  }

  cluster.zoomToShowLayer(marker, () => {
    const latlng = marker.getLatLng()
    map.setView(latlng, 10, { animate: true })
    marker.openPopup()
  })
}

window.initMap = initMap
window.updateMarkers = updateMarkers
window.focusMarker = focusMarker
