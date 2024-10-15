import { scrollShot } from './scroll-shot'
import { loadScript } from './load-script'
import { loadStyle } from './load-style'

// MAPA GENERAL
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
    fetch('/index.json')
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
          data.project.forEach(item => {
            if (item.title && item.category[0].title === type) {
              console.log(item.title)
              let content = ''
              if (item.image) content += `<img src="${item.image}" width=512 height=512>`
              content += `<h3 class="h5"><a href="${item.link}">${item.title}</a></h3>`
              if (item.summary) content += `<p>${item.summary}</p>`
              if (item.visitable) content += '<h3 class="compare">Acepta visitas <svg><use xlink:href="/draws.svg#check"></use></svg></h3>'
              // content += `<p><svg><use href="/draws.svg#bookmark"></use></svg> Categoría: <a class="alt" href="${item.category[0].link}">${item.category[0].title}</a></p>`
              content += `<p><a class="button alt" href="${item.link}"><svg><use href="/draws.svg#circle-info"></use></svg> MÁS</a></p>`
              // content = content
              //   .replace(/(?<=(\n|<p>))- (.*?)(?=(\n|<\/p>))/g, '<span class="map-list"><svg><use xlink:href="/draws.svg#hyphen"></use></svg> $2</span>')
              //   .replace(/\n/g, '<br>')
              const marker = L.marker([item.address.x, item.address.y], { icon: icon(color) }).bindPopup(content/*, { maxHeight: 400 }*/)
              oms.addMarker(marker)
              group.push(marker)
            }
          })
          return L.layerGroup(group).addTo(map)
        }

        // layer control
        const overlayMaps = {
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" height="16" width="8" alt="Marker"> Comunidades': content('Comunidades', 'gold'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" height="16" width="8" alt="Marker"> Espacios': content('Espacios', 'violet'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" height="16" width="8" alt="Marker"> Solo Servicios': content('Servicios', 'red'),
          '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" height="16" width="8" alt="Marker"> Otros': content('Otros', 'blue'),
          // '<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" height="16" width="8" alt="Marker"> Puntos de Interés': content('Interés', 'green')
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

// MAPA INIVIDUAL
const mapProject = document.getElementById('map-project')
if (mapProject) {
  function mapStart () {
    const x = mapProject.dataset.x
    const y = mapProject.dataset.y
    const isMobile = window.innerWidth <= 768 // Definición de tamaño móvil (puedes ajustarlo)
    const initialZoom = isMobile ? 4 : 5 // Ajuste de zoom según dispositivo
    // eslint-disable-next-line
    const map = L.map('map-project', {
      setView: true,
      trackResize: true
    }).setView([x, y], initialZoom)

    // eslint-disable-next-line
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    let marker = L.marker([x, y]).addTo(map)
  }

  scrollShot({
    rootMargin: '0%',
    query: '#map-project',
    doStart: gallery => {
      loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', null)
      loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', mapStart)
    }
  })
}

// ALTA
const formAlta = document.getElementById('form-alta')
if (formAlta) {
  // When form alta is submit
  document.addEventListener('submited-form-alta', e => {
    window.location = '/bienvenida/'
  })
}

// RESERVA
const formReserva = document.getElementById('form-reserva')
if (formReserva) {
  // When form reserva is submit
  document.addEventListener('submited-form-reserva', e => {
    window.location.hash = 'reserva-enviada'
  })
}
