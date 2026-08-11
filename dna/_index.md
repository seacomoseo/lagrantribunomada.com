# ADN del proyecto

## Resumen

La Gran Tribu Nómada (LGTN) es una red itinerante, digital y presencial, que conecta personas, comunidades, espacios y proyectos afines a formas de vida autónomas, comunitarias o nómadas.

La propuesta se materializa en cuatro frentes relacionados:

- una comunidad de personas, llamadas **amorígenes**, que se conecta y organiza principalmente por WhatsApp;
- un directorio web con fichas y un mapa interactivo de comunidades, espacios y servicios;
- encuentros presenciales en espacios anfitriones, vinculados a la naturaleza, la convivencia y el intercambio de dones;
- una asociación a la que se puede apoyar mediante cuota consciente, donaciones, colaboración o participación en el equipo.

El proyecto se dirige principalmente a España y, en particular, a la península ibérica, aunque su planteamiento y algunos formularios admiten una red más amplia. No debe presentarse como un simple directorio, una agenda de eventos ni una comunidad virtual: su rasgo diferencial es unir red digital, convivencia física, itinerancia y apoyo mutuo.

## Propósito

Dar visibilidad, sostén, recursos y conexiones a quienes buscan una vida más libre, compartida y autónoma. LGTN quiere facilitar que personas y proyectos afines se encuentren, colaboren, intercambien saberes o servicios, viajen juntos y hagan crecer una red con capacidad de cuidarse y nutrirse.

La promesa central puede resumirse así:

> Conectar personas, proyectos y espacios para hacer posible una vida en red, más comunitaria, autónoma y viva.

## Particularidades

- **Identidad comunitaria propia:** las personas de la red se denominan *amorígenes*; “tribu”, “red”, “familia”, “dones” y “con(tribu)ir” forman parte del vocabulario de marca.
- **Dimensión física y digital:** la web no es el fin, sino una infraestructura para provocar encuentros, viajes, colaboraciones y convivencia.
- **Directorio geográfico singular:** la portada incorpora un mapa Leaflet propio, alimentado con los proyectos del directorio y distinto del mapa genérico de contacto del tema.
- **Participación por capas:** alguien puede seguir las redes, entrar en la comunidad de WhatsApp, viajar con otras personas, asistir a encuentros, registrar un proyecto, hacerse soci@, donar o colaborar con la coordinación.
- **Encuentros con formato reconocible:** se celebran en espacios anfitriones, siguen a menudo la rueda celta del año e integran convivencia, naturaleza, artes, talleres, terapias, artesanía, música, voluntariado e intercambio.
- **Economía consciente:** se habla de cuotas y aportaciones conscientes, economía circular, trueque, intercambio y ventajas entre soci@s; el lucro no es el centro del relato.
- **Cuidado y convivencia:** el respeto a las personas, el cuerpo, la naturaleza, los espacios anfitriones y las necesidades del equipo forma parte del producto, no solo del tono.
- **Estética artesanal y vivencial:** tipografías manuales o desgastadas, fondos oscuros, tonos crema y coral, formas redondeadas, fotografías reales de la tribu y una presencia abundante de iconos y emojis.
- **Contenido vivo:** las rutas, el equipo, los encuentros, los grupos y algunas propuestas cambian. Antes de publicar datos operativos, comprobar la portada, la página de WhatsApp, el encuentro vigente y sus archivos fuente.

## Ciclo de publicación de encuentros

Los encuentros futuros se mantienen ocultos de los listados públicos mediante `hide: y`, aunque su URL se genera y sigue siendo navegable mediante enlace directo. Cuando el encuentro termina, se publica en los listados como parte del histórico cambiando a `hide: n` o eliminando la clave.

`hide` controla únicamente la presencia en listados. Es independiente de las opciones SEO, como `seo.noindex` o `seo.nofollow`, y no guarda relación con `draft`. No usar `draft` para este flujo.

## Criterios de verdad

Para decisiones de contenido o diseño:

1. Contrastar las afirmaciones con la portada y sus diálogos publicados y con los archivos fuente que los generan; si difieren, resolver la discrepancia antes de documentarla.
2. Tratar fechas, rutas, nombres del equipo, grupos, ventajas, cuotas y procesos de reserva como información volátil.
3. Diferenciar entre una realidad operativa y una aspiración. Expresiones como “queremos”, “nuestra intención” o “estaremos” no prueban que una iniciativa esté activa.
4. No tomar páginas de pruebas, borradores, formularios históricos o encuentros pasados como oferta vigente.

Este ADN se contrastó con el sitio publicado y con los archivos propios del proyecto el 27 de julio de 2026.

## Documentos disponibles

- [`copy.md`](copy.md): voz, tono, vocabulario, recursos expresivos y criterios de redacción.
- [`audiencia.md`](audiencia.md): públicos, necesidades, objeciones y llamadas a la acción adecuadas.
- [`identidad.md`](identidad.md): posicionamiento, personalidad y sistema visual.
- [`negocio.md`](negocio.md): propuesta de valor, participación, sostenimiento y prioridades.
- [`integraciones.md`](integraciones.md): mapa propio, fuentes de datos, formularios, canales externos, analítica y restricciones técnicas.

## Fuentes principales para mantener este ADN

- Portada y diálogos: `content/single/_home.es.md` y `data/section/home-*.yml`.
- Comunidad y altas: `content/single/whatsapp.es.md`, `data/section/formularios-whatsapp*.yml` y `data/section/formularios-alta.yml`.
- Directorio y mapa: `data/remote.yml`, `data/types/project.yml`, `assets/custom.js` y `assets/_custom.scss`.
- Encuentros: `content/event/` y `data/types/event.yml`.
- Sistema visual: `data/styles.yml`, `uploads/base/`, `uploads/fotos/` y `uploads/equipo/`.
- Integraciones activas: `data/config.yml`.
