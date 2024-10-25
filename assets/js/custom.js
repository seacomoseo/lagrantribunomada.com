import { scrollShot } from './scroll-shot'
import { loadScript } from './load-script'
import { loadStyle } from './load-style'

// MAPA GENERAL
const mapa = document.getElementById('map')
if (mapa) {
  // Definir el objeto donutClusters fuera de la función mapStart para evitar problemas de referencia
  let donutCluster

  function mapStart () {
    // zoom
    const minWidth = 600
    const maxWidth = 1300
    const minZoom = 5
    const maxZoom = 6.5
    const calculateZoom = (width) => {
      if (width <= minWidth) return minZoom
      if (width >= maxWidth) return maxZoom
      return minZoom + (maxZoom - minZoom) * (width - minWidth) / (maxWidth - minWidth)
    }
    const initialZoom = calculateZoom(window.innerWidth)

    // base
    // eslint-disable-next-line
    const map = L.map('map', {
      trackResize: true,
      scrollWheelZoom: false
    }).setView([40.007, -2.488], initialZoom)

    // eslint-disable-next-line
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Crear un solo cluster para todos los marcadores
    donutCluster = L.DonutCluster({
      chunkedLoading: true
    }, {
      key: 'category',
      arcColorDict: {
        Comunidades: 'cornflowerblue',
        Espacios: 'green',
        Servicios: 'crimson',
        Otros: 'violet'
      },
      style: {
        size: 40,
        fill: 'var(--dark)',
        opacity: 1,
        weight: 7
      },
      textContent: 'sum'
    }).addTo(map)

    // fetch data
    fetch('/index.json')
      .then(response => response.json())
      .then(data => {
        // icons
        function icon (color, iconId) {
          // eslint-disable-next-line
          return L.divIcon({
            className: 'leaflet-data-marker',
            // eslint-disable-next-line
            html: `<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="${color}" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><use fill="white" href="/draws.svg#${iconId}" x="36" y="16" transform="scale(.67)"></use></svg>`,
            iconAnchor: [24, 50],
            iconSize: [48, 48],
            popupAnchor: [0, -46]
          })
        }

        function addMarkersToCluster(type, color, iconId) {
          data.project.forEach(item => {
            if (item.title && item.category[0].title === type) {
              let content = ''
              if (item.image) content += `<img src="${item.image}" width=512 height=512>`
              content += `<h3 class="h5"><a href="${item.link}">${item.title}</a></h3>`
              if (item.summary) content += `<p>${item.summary}</p>`
              if (item.visitable) content += '<h3 class="compare">Acepta visitas <svg><use xlink:href="/draws.svg#check"></use></svg></h3>'
              content += `<p><a class="button alt" href="${item.link}"><svg><use href="/draws.svg#circle-info"></use></svg> MÁS</a></p>`
              content = content.replace(/<li>(.*?)<\/li>/g, '<li class="li-svg"><svg><use xlink:href="/draws.svg#hyphen"></use></svg> <div>$1</div></li>')
              let geo = item.address.geo
              if (geo) geo = JSON.parse(geo).coordinates
              // eslint-disable-next-line
              const marker = L.marker([geo[1], geo[0]], { icon: icon(color, iconId), title: item.title }).bindPopup(content)
              marker.feature = { properties: { category: type } } // Añadir categoría como propiedad del marcador
              donutCluster.addLayer(marker)
            }
          })
        }

        // Añadir marcadores al cluster para cada tipo
        addMarkersToCluster('Comunidades', 'cornflowerblue', 'people-group')
        addMarkersToCluster('Espacios', 'green', 'campground')
        addMarkersToCluster('Servicios', 'crimson', 'bullseye-arrow')
        addMarkersToCluster('Otros', 'violet', 'hands-holding-heart')

        // layer control
        const overlayMaps = {
          '<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="cornflowerblue" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><use fill="white" href="/draws.svg#people-group" x="36" y="16" transform="scale(.67)"></use></svg> Comunidades': donutCluster,
          '<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="green" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><use fill="white" href="/draws.svg#campground" x="36" y="16" transform="scale(.67)"></use></svg> Espacios': donutCluster,
          '<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="crimson" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><use fill="white" href="/draws.svg#bullseye-arrow" x="36" y="16" transform="scale(.67)"></use></svg> Solo Servicios': donutCluster,
          '<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="violet" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><use fill="white" href="/draws.svg#hands-holding-heart" x="36" y="16" transform="scale(.67)"></use></svg> Otros': donutCluster
        }

        // eslint-disable-next-line
        const layerControl = L.control.layers(null, overlayMaps).addTo(map)

        // Controlar la visibilidad de las capas
        map.on('overlayadd', function (eventLayer) {
          const layerName = eventLayer.name
          if (donutCluster) {
            map.addLayer(donutCluster)
          }
        })

        map.on('overlayremove', function (eventLayer) {
          const layerName = eventLayer.name
          if (donutCluster) {
            map.removeLayer(donutCluster)
          }
        })

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
      // https://github.com/kalisio/Leaflet.DonutCluster
      loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', null)
      loadStyle('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css', null)
      loadStyle('https://cdn.jsdelivr.net/npm/@kalisio/leaflet.donutcluster@1.1.0/src/Leaflet.DonutCluster.min.css', null)
      loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', () => {
        loadScript('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js', () => {
          loadScript('https://cdn.jsdelivr.net/npm/@kalisio/leaflet.donutcluster@1.1.0/src/Leaflet.DonutCluster.min.js', mapStart)
        })
      })
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
