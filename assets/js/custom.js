import { scrollShot } from './scroll-shot'
import { loadScript } from './load-script'
import { loadStyle } from './load-style'

// MAPA
const mapa = document.getElementById('map')
if (mapa) {
  function mapStart() {
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

    const map = L.map('map', {
      zoomSnap: 0.5, // Permite valores fraccionarios para el nivel de zoom
      zoomDelta: 0.5,
      trackResize: true
    }).setView([40.007, -2.488], initialZoom)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT_r-PYs-o_6cFTrBvwk1e-Q6Jq9ZH_HraPeyRUobkx392OUesn9WJSVwyX72udT5BDn__rCDGMq5W6/pub?gid=805672466&single=true&output=tsv')
      .then(response => response.json())
      .then(data => {
        const greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })

        const projectsGroup = []
        data.projects.forEach(item => {
          if (item.name) {
            let content = ''
            content += '<strong>Nombre</strong><br>' + item.name
            if (item.location) content += '<br><br><strong>Ubicación</strong><br>' + item.location + '<br><a href="https://maps.google.com/maps/search/' + item.name + ', ' + item.location + '" target="_blank">Abrir en GMaps</a>'
            if (item.summary) content += '<br><br><strong>Resumen</strong><br>' + item.summary
            if (item.description) content += '<br><br><strong>Descripción</strong><br>' + item.description
            if (item.advantages) content += '<br><br><strong>Ventajas</strong><br>' + item.advantages
            if (item.visitable) content += '<br><br><strong>Visitable</strong><br>' + item.visitable
            if (item.observations) content += '<br><br><strong>Observaciones</strong><br>' + item.observations
            projectsGroup.push(L.marker(item.coordinates).bindPopup(content.replace(/\n/, '<br>')))
          }
        })
        const projects = L.layerGroup(projectsGroup).addTo(map)

        const natureGroup = []
        data.nature.forEach(item => {
          if (item.name) {
            let content = ''
            content += '<strong>Nombre</strong><br>' + item.name
            if (item.location) content += '<br><br><strong>Ubicación</strong><br>' + item.location + '<br><a href="https://maps.google.com/maps/search/' + item.name + ', ' + item.location + '" target="_blank">Abrir en GMaps</a>'
            if (item.description) content += '<br><br><strong>Descripción</strong><br>' + item.description
            natureGroup.push(L.marker(item.coordinates, { icon: greenIcon }).bindPopup(content.replace(/\n/, '<br>')))
          }
        })
        const nature = L.layerGroup(natureGroup).addTo(map)

        const overlayMaps = {
          Proyectos: projects,
          Naturaleza: nature
        }
        const layerControl = L.control.layers(null, overlayMaps).addTo(map)
      })
  }

  scrollShot({
    rootMargin: '0%',
    query: '#map',
    doStart: gallery => {
      loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', null)
      loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', mapStart)
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
