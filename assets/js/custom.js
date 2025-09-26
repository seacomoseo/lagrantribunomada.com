import { scrollShot } from './scroll-shot'
import { loadLeaflet, tile } from './leaflet'
import { loadScript } from './load-script'
import { loadStyle } from './load-style'

// Definir el objeto donutClusters fuera de la función mapStart para evitar problemas de referencia
let donutCluster
let bounds

// MAPA GENERAL

function mapStart () {
  // base
  const map = L.map('map', {
    trackResize: true,
    scrollWheelZoom: false
  }) // .setView([40.007, -2.488], initialZoom)

  // Crear un solo cluster para todos los marcadores
  donutCluster = L.DonutCluster({
    chunkedLoading: true
  }, {
    key: 'category',
    arcColorDict: {
      Comunidades: 'cornflowerblue',
      Espacios: 'green',
      Servicios: 'crimson'
      // Otros: 'violet'
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
      console.log(data)
      bounds = L.latLngBounds() // Crea límites manualmente

      // Añadir marcadores al cluster para cada tipo
      addMarkersToCluster(data, 'Comunidades', 'cornflowerblue', 'groups_3')
      addMarkersToCluster(data, 'Espacios', 'green', 'camping')
      addMarkersToCluster(data, 'Servicios', 'crimson', 'volunteer_activism')
      // addMarkersToCluster(data, 'Otros', 'violet', 'bullseye-arrow')

      // layer control
      const overlayMaps = {
        [overlayMap('Comunidades', 'cornflowerblue', 'groups_3')]: donutCluster,
        [overlayMap('Espacios', 'green', 'camping')]: donutCluster,
        [overlayMap('Servicios', 'crimson', 'volunteer_activism')]: donutCluster
        // [overlayMap('Otros', 'violet', 'bullseye-arrow')]: donutCluster
      }

      /* const layerControl = */ L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map)

      tile(map)

      // Controlar la visibilidad de las capas
      map.on('overlayadd', function (eventLayer) {
        // const layerName = eventLayer.name
        if (donutCluster) map.addLayer(donutCluster)
      })

      map.on('overlayremove', function (eventLayer) {
        // const layerName = eventLayer.name
        if (donutCluster) map.removeLayer(donutCluster)
      })

      // popup over top elements when popupopen in small screen sizes
      const mapPane = document.querySelector('.leaflet-map-pane')
      if (innerWidth < 480) {
        map.on('popupopen', () => { mapPane.style.zIndex = 10000 })
        map.on('popupclose', () => { mapPane.style.zIndex = '' })
      }

      map.fitBounds(bounds, { padding: [50, 50] })
    })
}

const validateCoordinates = geo => {
  if (!Array.isArray(geo) || geo.length < 2) return false
  const [lon, lat] = geo
  return isFinite(lon) && isFinite(lat)
}

function addMarkersToCluster (data, type, color, iconId) {
  data.project.forEach(item => {
    if (item.title && item.category?.[0]?.title === type) {
      let content = ''

      if (item.image) content += `<img src="${item.image}" width=512 height=512>`
      content += `<h3 class="h5"><a href="${item.link}">${item.title}</a></h3>`
      if (item.summary) content += `<p>${item.summary}</p>`
      if (item.visitable) content += `<h3 class="compare">Acepta visitas <i class="icon">check</i>`
      content += `<p><a class="button alt" href="${item.link}"><i class="icon">info</i> M\xC1S</a></p>`

      content = content.replace(/<li>(.*?)<\/li>/g, `<li class="li-icon"><i class="icon">remove</i> <div>$1</div></li>`)

      let geo = item.address?.geo
      if (geo) {
        try {
          geo = JSON.parse(geo).coordinates
        } catch (e) {
          console.error('Invalid geo JSON:', item.address.geo, e)
          geo = null
        }
      }

      if (validateCoordinates(geo)) {
        const marker = L.marker([geo[1], geo[0]], { icon: icon(color, iconId), title: item.title }).bindPopup(content)
        marker.feature = { properties: { category: type } }
        donutCluster.addLayer(marker)
        bounds.extend(marker.getLatLng())
      } else {
        console.warn('Skipping item without valid geo coordinates:', item)
      }
    }
  })
}

function icon (color, iconId) {
  return L.divIcon({
    className: 'leaflet-data-marker',
    html: `<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188"><path fill="${color}" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/></svg><i class="icon leaflet-data-marker__icon">${iconId}</i>`,
    iconAnchor: [24, 50],
    iconSize: [48, 48],
    popupAnchor: [0, -46]
  })
}

function overlayMap (type, color, iconId) {
  return '<svg class="leaflet-data-marker__svg" viewBox="0 -5 149 188">' +
    `<path fill="${color}" stroke="white" stroke-width="12" paint-order="stroke" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/>` +
    `</svg>` +
    `<i class="icon">${iconId}</i>` +
    ` ${type}`
}

const mapa = document.getElementById('map')
if (mapa) {
  scrollShot({
    rootMargin: '0%',
    query: '#map',
    doStart: () => {
      loadLeaflet().then(() => {
        // https://github.com/kalisio/Leaflet.DonutCluster
        loadStyle('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css')
        loadStyle('https://cdn.jsdelivr.net/npm/@kalisio/leaflet.donutcluster@1.1.0/src/Leaflet.DonutCluster.min.css')
        Promise.all([
          loadScript('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'),
          loadScript('https://cdn.jsdelivr.net/npm/@kalisio/leaflet.donutcluster@1.1.0/src/Leaflet.DonutCluster.min.js')
        ]).then(() => {
          mapStart()
        }).catch(error => {
          console.error(error)
        })
      }).catch(error => {
        console.error(error)
      })
    },
    end: null // For unobserve
  })
}
