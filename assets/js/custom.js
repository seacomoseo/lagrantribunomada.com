import { scrollShot } from './scroll-shot'
import { loadScript } from './load-script'
import { loadStyle } from './load-style'

// MAPA
const mapa = document.getElementById('map')
if (mapa) {
  function mapStart() {
    // zoom
    const minWidth = 600
    const maxWidth = 1300
    const minZoom = 5
    const maxZoom = 7
    const calculateZoom = (width) => {
      if (width <= minWidth) return minZoom
      if (width >= maxWidth) return maxZoom
      return minZoom + (maxZoom - minZoom) * (width - minWidth) / (maxWidth - minWidth)
    }
    const initialZoom = calculateZoom(window.innerWidth)

    // base
    const map = L.map('map', {
      zoomSnap: 0.5, // Permite valores fraccionarios para el nivel de zoom
      zoomDelta: 0.5,
      trackResize: true
    }).setView([40.007, -2.488], initialZoom)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // spiderfier
    const oms = new OverlappingMarkerSpiderfier(map)

    // fetch data
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT_r-PYs-o_6cFTrBvwk1e-Q6Jq9ZH_HraPeyRUobkx392OUesn9WJSVwyX72udT5BDn__rCDGMq5W6/pub?gid=805672466&single=true&output=tsv')
      .then(response => response.json())
      .then(data => {
        // icons
        function icon (color) {
          return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }
        function iconLayer (color) {
          return `<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png" height="16" width="8" alt="Marker">`
        }

        function content (type, color) {
          const group = []
          data[type] && data[type].forEach(item => {
            if (item.name) {
              let content = ''
              content += '<h3>' + item.name + '</h3>'
              if (item.summary) content += `<p>${item.summary}</p>`
              if (item.web) content += `<p class="map-data"><svg><use xlink:href="/draws.svg#arrow-pointer"></use></svg> <a href="${item.web}" target="_blank">${item.web}</a></p>`
              if (item.phone) content += `<p class="map-data"><svg><use xlink:href="/draws.svg#phone"></use></svg> <a href="tel:${item.phone.replace(/\D/g, '')}" target="_blank">${item.phone}</a></p>`
              if (item.whatsapp) content += `<p class="map-data"><svg><use xlink:href="/draws.svg#whatsapp"></use></svg> <a href="https://wa.me/${item.whatsapp.replace(/\D/g, '')}" target="_blank">${item.whatsapp}</a></p>`
              if (item.location) content += `<p class="map-data"><svg><use xlink:href="/draws.svg#location-dot"></use></svg> <a href="https://maps.google.com/maps/search/${item.name}, ${item.location}" target="_blank">${item.location}</a></p>`
              if (item.description) content += `<h3>Descripción</h3><p>${item.description}</p>`
              if (item.advantages) content += `<h3>Ventajas para socios</h3><p>${item.advantages}</p>`
              if (item.visitable) content += `<h3 class="compare">Acepta visitas <svg><use xlink:href="/draws.svg#check"></use></svg></h3>`
              if (item.observations) content += `<h3>Observaciones</h3><p>${item.observations}</p>`
              content = content
                .replace(/(?<=(<br>|<p>))- (.*?)(?=(<br>|<\/p>))/g, '<span class="map-list"><svg><use xlink:href="/draws.svg#hyphen"></use></svg> $2</span>')
                .replace(/\n/g, '<br>')
              const marker = L.marker(item.coordinates, { icon: icon(color) }).bindPopup(content/*, { maxHeight: 400 }*/)
              oms.addMarker(marker)
              group.push(marker)
            }
          })
          return L.layerGroup(group).addTo(map)
        }

        // layer control
        const overlayMaps = {
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" height="16" width="8" alt="Marker"> Comunidades': content('communities', 'gold'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" height="16" width="8" alt="Marker"> Espacios': content('spaces', 'violet'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" height="16" width="8" alt="Marker"> Solo Servicios': content('services', 'red'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" height="16" width="8" alt="Marker"> Otros': content('others', 'blue'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" height="16" width="8" alt="Marker"> Puntos de Interés': content('interest', 'green')
        }
        const layerControl = L.control.layers(null, overlayMaps).addTo(map)

        // popup over top elements when popupopen in small screen sizes
        const mapPane = document.querySelector('.leaflet-map-pane')
        if (window.innerWidth < 480) {
          map.on('popupopen', () => { mapPane.style.zIndex = 10000 })
          map.on('popupclose', () => { mapPane.style.zIndex = '' })
        }
      })
  }

  scrollShot({
    rootMargin: '0%',
    query: '#map',
    doStart: gallery => {
      // https://github.com/Leaflet/Leaflet.markercluster
      // loadStyle('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css', null)
      // loadScript('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js', null)
      loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', null)
      loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', () => {
        // https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js', mapStart)
      })
    }
  })
}

// ALTA
const formAlta = document.getElementById('form_alta_header')
if (formAlta) {
  // When form alta is submit
  document.addEventListener('submited_form_alta_header', e => {
    window.location = '/bienvenida/'
  })
}
