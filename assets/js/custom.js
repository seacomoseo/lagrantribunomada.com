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

    // fetch data
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT_r-PYs-o_6cFTrBvwk1e-Q6Jq9ZH_HraPeyRUobkx392OUesn9WJSVwyX72udT5BDn__rCDGMq5W6/pub?gid=805672466&single=true&output=tsv')
      .then(response => response.json())
      .then(data => {
        // icons
        const goldIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
        const greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })

        // projects
        const projectsGroup = []
        data.projects.forEach(item => {
          if (item.name) {
            let content = ''
            content += '<strong>Nombre</strong><br>' + item.name
            if (item.location) content += '<br><br><strong>Ubicación</strong><br>' + item.location + '<br><a href="https://maps.google.com/maps/search/' + item.name + ', ' + item.location + '" target="_blank">Abrir en GMaps</a>'
            if (item.summary) content += '<br><br><strong>Resumen</strong><br>' + item.summary
            if (item.description) content += '<br><br><strong>Descripción</strong><br>' + item.description
            if (item.advantages) content += '<br><br><strong>Ventajas para socios</strong><br>' + item.advantages
            if (item.visitable) content += '<br><br><strong>Acepta visitas</strong><br>Si'
            if (item.observations) content += '<br><br><strong>Observaciones</strong><br>' + item.observations
            projectsGroup.push(L.marker(item.coordinates).bindPopup(content.replace(/\n/, '<br>'), { maxHeight: 400 }))
          }
        })
        const projects = L.layerGroup(projectsGroup).addTo(map)

        // communities
        const communitiesGroup = []
        data.communities.forEach(item => {
          if (item.name) {
            let content = ''
            content += '<strong>Nombre</strong><br>' + item.name
            if (item.location) content += '<br><br><strong>Ubicación</strong><br>' + item.location + '<br><a href="https://maps.google.com/maps/search/' + item.name + ', ' + item.location + '" target="_blank">Abrir en GMaps</a>'
            if (item.summary) content += '<br><br><strong>Resumen</strong><br>' + item.summary
            if (item.description) content += '<br><br><strong>Descripción</strong><br>' + item.description
            if (item.advantages) content += '<br><br><strong>Ventajas para socios</strong><br>' + item.advantages
            if (item.visitable) content += '<br><br><strong>Acepta visitas</strong><br>Si'
            if (item.observations) content += '<br><br><strong>Observaciones</strong><br>' + item.observations
            communitiesGroup.push(L.marker(item.coordinates, { icon: goldIcon }).bindPopup(content.replace(/\n/, '<br>'), { maxHeight: 400 }))
          }
        })
        const communities = L.layerGroup(communitiesGroup).addTo(map)

        // interest
        const interestGroup = []
        data.interest.forEach(item => {
          if (item.name) {
            let content = ''
            content += '<strong>Nombre</strong><br>' + item.name
            if (item.location) content += '<br><br><strong>Ubicación</strong><br>' + item.location + '<br><a href="https://maps.google.com/maps/search/' + item.name + ', ' + item.location + '" target="_blank">Abrir en GMaps</a>'
            if (item.description) content += '<br><br><strong>Descripción</strong><br>' + item.description
            interestGroup.push(L.marker(item.coordinates, { icon: greenIcon }).bindPopup(content.replace(/\n/, '<br>'), { maxHeight: 400 }))
          }
        })
        const interest = L.layerGroup(interestGroup).addTo(map)

        // layer control
        const overlayMaps = {
          Proyectos: projects,
          Comunidades: communities,
          'Puntos de Interés': interest
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
