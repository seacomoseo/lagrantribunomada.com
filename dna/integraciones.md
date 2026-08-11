# Integraciones y singularidades técnicas

## Directorio y mapa interactivo

El mapa de la portada es una funcionalidad específica de LGTN. No es el mapa genérico de contacto del tema.

### Flujo de datos

1. `data/remote.yml` importa durante el prebuild un inventario publicado como hoja de cálculo.
2. Los campos se transforman en entradas de tipo `project`, incluidas categoría, contacto, resumen, imágenes y ubicación.
3. Hugo incorpora los proyectos al índice JSON público.
4. `assets/custom.js` solicita `/index.json` en el navegador.
5. El mapa representa los proyectos que tienen categoría reconocida y coordenadas válidas.

### Implementación

- Leaflet como motor cartográfico.
- Teselas y atribución de OpenStreetMap mediante el cargador común del tema.
- Leaflet.markercluster y Leaflet.DonutCluster, cargados desde CDN cuando el mapa entra en pantalla.
- Agrupaciones circulares que muestran la composición por categoría.
- Categorías activas: **Comunidades**, **Espacios** y **Servicios**.
- Cada categoría combina color, icono y etiqueta.
- Los popups muestran imagen, nombre, resumen, indicación de visitas cuando procede y enlace a la ficha.
- El encuadre inicial se ajusta a los marcadores con coordenadas válidas.
- En móvil, el popup eleva temporalmente la capa del mapa para no quedar oculto por otros elementos.

### Restricciones

- Mantener los nombres de categorías sincronizados entre contenido, hoja remota, JavaScript, estilos e interfaz.
- No confiar solo en el color para distinguir categorías.
- Una coordenada ausente o con JSON inválido excluye el proyecto del mapa, aunque su ficha pueda seguir existiendo.
- La capa de datos es pública; no almacenar direcciones o coordenadas que no deban publicarse.
- La carga depende de recursos externos. Con red degradada, la página debe seguir explicando el directorio y ofreciendo acceso a las fichas.
- Conservar la carga diferida para no penalizar la portada.

### Archivos propios

- `assets/custom.js`
- `assets/_custom.scss`
- `data/remote.yml`
- `data/section/home-directorio.yml`
- `data/types/project.yml`
- `data/types/category.yml`

## Fuente remota del directorio

El directorio se alimenta de una exportación pública de Google Sheets procesada en el prebuild. La hoja es una fuente editorial externa, no una base de datos privada.

Al cambiar columnas o mapeos:

- actualizar `data/remote.yml`;
- ejecutar una regeneración completa del prebuild;
- revisar proyectos con y sin coordenadas;
- comprobar categorías, fichas, `/index.json` y mapa;
- validar el comportamiento cuando la fuente remota no esté disponible.

## Formularios

Los formularios propios envían datos a Google Apps Script y distinguen varios recorridos:

- contacto general;
- entrada a la comunidad de WhatsApp;
- alta de soci@ y, opcionalmente, de proyecto o servicio;
- reserva y valoración de encuentros;
- formularios históricos o restringidos.

### Datos y publicación

- El alta de proyecto puede recoger contacto, descripción, ventajas, ubicación, archivos y disponibilidad para visitas o entrevistas.
- Algunos datos alimentan posteriormente el directorio público.
- Otros campos se declaran expresamente internos.
- Los formularios incluyen consentimiento de tratamiento de datos.

Antes de añadir o reutilizar un campo, definir si será público, interno, opcional, necesario para el mapa o limitado a un encuentro.

### Archivos propios

- `data/section/home-contacto.yml`
- `data/section/formularios-alta.yml`
- `data/section/formularios-whatsapp.yml`
- `data/section/formularios-whatsapp-grupos.yml`
- `data/section/formularios-reserva.yml`
- `data/section/formularios-rezagados.yml`
- campos de reserva y valoración dentro de `content/event/`

## WhatsApp

WhatsApp es la puerta comunitaria principal. La página `/whatsapp/` describe grupos con propósitos diferenciados:

- **Amorígenes:** vínculo social y vida de la comunidad;
- **Anuncios:** ofertas, búsquedas, intercambios, ventas y voluntariado;
- **Agenda:** actividades con fecha;
- **Tribnb:** alojamiento sin intercambio económico;
- **Gran Foro Tribal:** información, reflexión y debate;
- **Caravana Amorigen:** rutas y viajes compartidos.

La persona completa un formulario antes de recibir el acceso general. Los enlaces de invitación son operativos y volátiles, por lo que su vigencia debe comprobarse en el recorrido publicado.

## Canales sociales y medios

- Telegram: canal de noticias y grupos vinculados a anfitriones o voluntariado.
- Instagram: relato visual y difusión.
- YouTube: vídeo de presentación y archivo audiovisual.
- WhatsApp: comunidad, coordinación y contacto directo.

La cabecera de la portada incorpora un vídeo de YouTube. Los medios externos dependen del consentimiento de cookies cuando corresponda.

## Analítica y consentimiento

El proyecto tiene configurada analítica GA4 y un sistema de consentimiento de cookies. La experiencia debe conservar funciones esenciales aunque la persona rechace analítica o medios opcionales.

## Comprobaciones específicas del proyecto

- En el directorio, verificar proyectos con y sin coordenadas, correspondencia de categorías, contenido de `/index.json`, agrupaciones, popups y encuadre en móvil y escritorio.
- Ante un fallo de la hoja remota o de los recursos cartográficos, conservar accesibles la explicación del directorio y las fichas.
- En los formularios, comprobar los campos condicionales, la clasificación pública o interna de cada dato y el mensaje posterior de cada recorrido.
- En WhatsApp y medios externos, comprobar que los grupos y destinos siguen correspondiendo con su propósito y que el contenido esencial permanece disponible sin consentimiento opcional.

## Fuentes de mantenimiento

Revisar los archivos citados en cada apartado y contrastar el resultado con la portada, `/alta/`, `/whatsapp/` y un encuentro vigente.
