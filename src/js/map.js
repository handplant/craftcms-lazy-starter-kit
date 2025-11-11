import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

let map
window.clusterGroup = null
window.mapMarkers = {}
window.popupCache = {}

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
    const color = loc.color || '#000'

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

    const marker = L.marker([loc.lat, loc.lng], { icon }).bindPopup('')

    marker.on('popupopen', async (e) => {
      const popup = e.popup
      popup.setContent(window.popupCache[loc.id] || '<div class="ui-popup"><div class="ui-popup__content">Loading...</div></div>')

      if (!window.popupCache[loc.id]) {
        const query = `
          query BlogEntry($id: [QueryArgument]) {
            entry(id: $id) {
              id
              title
              url
              ... on etPageBlog_Entry {
                  card {
                    image {
                      url(transform: "thumbnail")
                      width
                      height
                      alt
                    }
                  }
                  relationCategories {
                    title
                  }
                }
            }
          }
        `
        try {
          const res = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { id: loc.id } }),
          })
          const { data, errors } = await res.json()

          if (errors) {
            throw new Error(errors[0].message)
          }
          const e = data.entry

          const html = `
            <div class="ui-popup">
              ${e.card?.image?.[0]?.url ? `
                <div class="ui-popup__image">
                  <img src="${e.card.image[0].url}" alt="${e.card.image[0].alt || ''}">
                </div>` : ''
          }
              <div class="ui-popup__content">
                <span class="ui-bold">${e.relationCategories?.[0]?.title || ''}</span>
                <strong>${e.title}</strong>
                <a href="${e.url}" class="ui-link">Read more →</a>
              </div>
            </div>
          `
          window.popupCache[loc.id] = html
          marker.setPopupContent(html)
        } catch (err) {
          popup.setContent('<div class="ui-popup"><div class="ui-popup__content">⚠️ Error loading content.</div></div>')
        }
      }
    })

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
