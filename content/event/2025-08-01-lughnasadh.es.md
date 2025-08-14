---
slug: lughnasadh
title: LUGHNASADH
icon: ☀️
image: carteles/2025-08-01-lughnasadh.jpg
hide: false
draft: false
noindex: true
seo: ''
description: ''
date: 2025-08-01 00:00:00
end: 2025-08-03 00:00:00
address:
  name: Bosque ADIWA
  street: ''
  pc: '44580'
  locality: Matarraña
  region: Teruel
  country: ES
  geo: '{"type":"Point","coordinates":[0.133333,40.883333]}'
  link: ''

video: ''
cancelled: false


# BOOKING
booking:
  active: false
  inputs:
  - type: hidden
    name: _sheetname
    label: Reservas
  - type: hidden
    name: Encuentro
    label: ☀️ LUGHNASADH 2025
  - type: text
    name: Nombre y Apellidos
    required: true
  - type: tel
    name: Teléfono
    required: true
  - type: email
    name: Email
    required: true
  - type: text
    name: Pernocta
    hint: ¿Cómo vais a pernoctar? Tienda, vehículo...
    required: true
    full: true
  - type: textarea
    name: Artesanías
    hint: ¿Tienes artesanías o quieres formar parte del mercadillo? Si es así, cuéntanos cuales son
    full: true
  - type: textarea
    name: Servicios
    hint: ¿Quieres ofrecer tus dones/servicios en el espacio? Si es así, cuéntanos cuales son
    full: true
  - type: number
    name: Aportación
    label: 'Aportación sugerida: 40 €'
    hint: |
      ¿De cuánto va a ser tu aportación consciente? (€) \
      Hemos estimado que 40 € es una cantidad apropiada para valorar el espacio, las actividades, el trabajo del equipo y para permitir que LGTN continúe expandiendo esta hermosa red y sus encuentros. Tu contribución, sea cual sea, será valorada y apreciada. \
      Tras enviar el formulario contactaremos contigo para darte indicaciones.
    required: true
    min: 1
  - type: text
    name: Cómo
    hint: ¿Cómo nos has conocido?
    full: true
  - type: textarea
    name: Otros
    hint: ¿Algo más que debamos saber o alguna necesidad/duda que tengas?
    full: true


# FEEDBACK
feedback:
  active: true
  inputs:

  - type: hidden
    name: _sheetname
    label: Feedback ☀️ LUGHNASADH 2025

  - type: text
    name: Nombre
  - type: number
    name: Edad
    min: 1


  - type: radio
    name: General
    label: El encuentro LUGHNASADH en general
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: General Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: General
    # show_if: General


  - type: h3
    label: Organización

  - type: radio
    name: Organización
    label: La organización del encuentro
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Organización Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Organización

  - type: radio
    name: Organización Sostén
    label: Sostén y resolución del personal de organización
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Organización Sostén Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Organización Sostén

  - type: radio
    name: Organización Publicidad
    label: Publicidad/redes del encuentro
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Organización Publicidad Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Organización Publicidad


  - type: h3
    label: Espacio

  - type: radio
    name: Espacio Infraestructura
    label: Infraestructura/servicios
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Espacio Infraestructura Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Espacio Infraestructura

  - type: radio
    name: Espacio Entorno
    label: Entorno
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Espacio Entorno Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Espacio Entorno

  - type: radio
    name: Espacio Zonas
    label: Zonas
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Espacio Zonas Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Espacio Zonas


  - type: h3
    label: Actividades

  - type: radio
    name: Actividades Programación
    label: Programación general
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades Programación Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades Programación

  - type: radio
    name: Actividades 🔥 Jam Salvaje (Batucada)
    label: 🔥 Jam Salvaje (Batucada)
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🔥 Jam Salvaje (Batucada) Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🔥 Jam Salvaje (Batucada)

  - type: radio
    name: Actividades 🪷 Baño de Gracia Tribal
    label: 🪷 Baño de Gracia Tribal
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🪷 Baño de Gracia Tribal Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🪷 Baño de Gracia Tribal

  - type: radio
    name: Actividades 🧚🏽 Círculo de Dones
    label: 🧚🏽 Círculo de Dones
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🧚🏽 Círculo de Dones Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🧚🏽 Círculo de Dones

  - type: radio
    name: Actividades 💝 Calidez Humana
    label: 💝 Calidez Humana
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 💝 Calidez Humana Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 💝 Calidez Humana

  - type: radio
    name: Actividades 🌞 Ritual Lughnasadh y Ceremonia de Cacao
    label: 🌞 Ritual Lughnasadh y Ceremonia de Cacao
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🌞 Ritual Lughnasadh y Ceremonia de Cacao Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🌞 Ritual Lughnasadh y Ceremonia de Cacao

  - type: radio
    name: Actividades 🕺 Ecstatic Dance 'Tu Sol en Danza'
    label: 🕺 Ecstatic Dance 'Tu Sol en Danza'
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🕺 Ecstatic Dance 'Tu Sol en Danza' Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🕺 Ecstatic Dance 'Tu Sol en Danza'

  - type: radio
    name: Actividades 🗣️ Charla Dinámica 'Enciende tu llama vital'
    label: 🗣️ Charla Dinámica 'Enciende tu llama vital'
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🗣️ Charla Dinámica 'Enciende tu llama vital' Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🗣️ Charla Dinámica 'Enciende tu llama vital'

  - type: radio
    name: Actividades 🧘‍♂️ Conecta con tu energía interior
    label: 🧘‍♂️ Conecta con tu energía interior
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 🧘‍♂️ Conecta con tu energía interior Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 🧘‍♂️ Conecta con tu energía interior

  - type: radio
    name: Actividades 💃 Micro Abierto
    label: 💃 Micro Abierto
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Actividades 💃 Micro Abierto Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Actividades 💃 Micro Abierto


  - type: h3
    label: Cocina

  - type: radio
    name: Cocina Menú
    label: El menú de cocina
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Cocina Menú Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Cocina Menú

  - type: radio
    name: Cocina Precio
    label: El precio de cocina
    x: true
    options:
    - option: 1
    - option: 2
    - option: 3
    - option: 4
    - option: 5
    - option: 6
    - option: 7
    - option: 8
    - option: 9
    - option: 10
  - type: textarea
    name: Cocina Precio Observaciones
    label: Observaciones
    hint: ¿Algo que añadir o que quieras comentar?
    show_if: Cocina Precio


  - type: h3
    label: Talleristas

  - type: check
    name: Tallerista Fuiste
    label: ¿Fuiste tallerista en el encuentro?
  - type: textarea
    name: Tallerista Mejoras
    label: Observaciones
    hint: ¿Algo que quieras mencionar para mejorar en próximos encuentros?
    show_if: Tallerista Fuiste


  - type: h3
    label: Terapias

  - type: check
    name: Terapias Recibiste
    label: ¿Recibiste alguna terapia?
  - type: textarea
    name: Terapias Mejoras
    label: Observaciones
    hint: ¿Algo que quieras mencionar para mejorar en próximos encuentros?
    show_if: Terapias Recibiste


  - type: h3
    label: Artesanias

  - type: check
    name: Artesanias Pusiste
    label: ¿Pusiste algún puesto en el mercadillo?
  - type: textarea
    name: Artesanias Mejoras
    label: Observaciones
    hint: ¿Alguna petición para el espacio de artesanías para próximos encuentros?
    show_if: Artesanias Pusiste


  - type: h3
    label: Otros

  - type: check
    name: Otros Primera Vez
    label: ¿Era tu primera vez en un encuentro de LGTN?
  - type: textarea
    name: Otros Primera Experiencia
    label: Observaciones
    hint: ¿Podrías comentar tu primera experiencia?
    show_if: Otros Primera Vez

  - type: textarea
    name: Otros Caracteriza
    label: Hayas venido a uno o a todos, responde, nos interesa tu opinión
    hint: Según tú, ¿qué caracteriza estos encuentros o qué los puede diferenciar de otros que conoces? ¿Qué ofrecen al usuario estos encuentros?
---

🌬️ Este es un llamado para la convivencia en tribu, festejando la rueda de la vida 🌈🌻🌸
{.subtitle}

## ::👣:: ¿Qué es LGTN?

Personas enamoradas de la tribu, unidas por un proyecto cuyo objetivo es crear una gran red en la que interconectarnos, nutrirnos y crecer a todos los niveles 🚀

[[Más info]](/#proyecto)

## ::☀️:: ¿Qué es “Lughnasad”?

Lughnasad es la festividad celta que celebra la recogida de la cosecha; es momento de reflexionar la recolección anual y agradecer todos los frutos que tenemos.

En este día se honra al dios solar **Lugh** ☀️

Seguimos la rueda celta, que marca las fases de la naturaleza y la cosecha, para elegir la fecha de nuestros encuentros 🏕️

En esta festividad el foco estará puesto en recibir la alta vibración de la luz, el sol y el calor que nos dan vida, combinando los dones de esta red, tribu, familia para disfrutar de los saberes y las alegrías que nos propiciamos entre todes.

## ::📍:: Lugar

**El Bosque Adiwa**, en plena Sierra del Matarraña (Teruel).

Un espacio íntimo y salvaje de **15 hectáreas** para explorar y reconectar con la naturaleza.

Es el lugar que parte del equipo está sembrando para establecer un hogar y un punto de luz, corazón y libertad.

¡Estamos deseando inaugurar este mágico entorno con nuestra tribu, _La Gran Tribu Nómada_!

## ::🎯:: ¿Cuál es el objetivo de estos encuentros?

- Visibilizar y aportar a **espacios o proyectos** comunitarios (serán los lugares de encuentro).
- Dar lugar a **talleristas, artesanes, artistas y terapeutas** para darse a conocer.
- Crear espacios donde generar y fomentar una **economía circular entre los participantes**.
- Ofrecer un lugar donde **convivir, compartir y disfrutar en tribu**.
- Hacer crecer la red, la familia 🤍

## ::🫂:: ¿Cómo nos Relacionamos?

- Con **las personas**, desde el amor, el respeto y la consciencia.
- Con **nuestro cuerpo**, como un templo, cuidando nuestra alimentación y sacándolo a bailar.
- Con **el entorno**, cuidando la naturaleza y el ambiente que reina en él, dejándolo todo mejor de lo que estaba.

## ::⛺:: Alojamiento

Pernoctando en vehículo o en tienda de campaña 🩷

## ::🗺️:: Zonas

Las zonas habilitadas serán:

- ::🚗:: Zona parking
- ::🚐:: Zona campers
- ::⛺:: Zona acampada
- ::🍴:: Zona techada cocina
- ::🐋:: Ducha y wáter seco
- ::🔥:: Zona **on** para actividades programadas
- ::🧩:: Zona **off** para actividades alternativas
- ::💞:: Zona chill
- ::🪡:: Zona mercadillo artesanías
- ::💆🏽‍♀️:: Zonas de intercambio de servicios
- ::🌿:: Zona infinita de bosque
- ::🌊:: Zona pozas a 15' en coche

## ::🎒:: ¿Qué traer?

- Tu garrafa de agua (llena o vacía — hay un manantial muy cerca), vaso, plato y cubiertos.
- Lo necesario para tu aseo y pernocta (toalla, tienda, ropa de cama, almohada…).
- Instrumentos, malabares, pinturas, artesanías, dones y tus ganas de crear, expresar y compartir 😍🥰

## ::ℹ️:: Detalles

- El Bosque Adiwa es un espacio emergente donde se proyecta una masía comunitaria y diversos espacios de sanación y convivencia 🌳🩷
- Os animamos a **compartir vehículo** por sostenibilidad, economía y placer de compartir 🚙 (se gestionará por WhatsApp).
- Durante el encuentro se podrán tomar fotos y vídeos; si tienes inconveniente, avísanos a tu llegada 📸
- Si tu compa perruno debe acompañarte, ponte en contacto con nosotres 🐾
- Toda iluminación personal y general es bienvenida 🔦, sobre todo para los trayectos hacia las diferentes zonas de noche 🌌. Pedimos desde el espacio que seáis autónomos en la carga de vuestros dispositivos ⚡ (mechero del coche, cargadores solares, etc.). De todos modos, habrá una zona de carga para emergencias 🔌🙏
- Se habilitará una zona para poner puesto de artesanías y un espacio para intercambio de servicios y terapias.

## ::📅:: Programación

Eres bienvenide para voluntariar y compartir **a partir del martes 29** en el espacio 👷‍♀️

| Día         | Hora  | ⭐️ | Actividad                                                                            |
|-------------|-------|----|--------------------------------------------------------------------------------------|
| **Viernes** | 18:00 | 🚀 | Aterrizaje                                                                           |
|             | 21:00 | 🫕 | Cena                                                                                 |
|             | 22:00 | 👣 | Bienvenida                                                                           |
|             | 22:30 | 🔥 | Jam Salvaje                                                                          |
| **Sábado**  | 09:00 | 🥞 | Desayuno                                                                             |
|             | 11:00 | 🪷 | "Baño de Gracia Tribal" con Michalina Sakowska                                       |
|             | 13:00 | 🧚🏽 | "Círculo de Dones"                                                                   |
|             | 14:00 | 🫕 | Comida                                                                               |
|             | 17:00 | 💝 | "Calidez Humana" con Nerea DiRo                                                      |
|             | 19:00 | 🌞 | Ritual "Lughnasadh" y Ceremonia de Cacao con Lua Moonrise, Paula Aguarón y Bea Almar |
|             | 21:00 | 🥙 | Cena                                                                                 |
|             | 22:00 | 🕺 | Ecstatic Dance "Tu Sol en Danza" con DJ Nashwa                                       |
| **Domingo** | 09:00 | 🥞 | Desayuno                                                                             |
|             | 10:30 | 🗣️ | Charla Dinámica "Enciende tu llama vital" con Dr. Mario Navarro                      |
|             | 12:30 | 🧘‍♂️ | "Conecta con tu energía interior" con Fran Rivero                                    |
|             | 14:00 | 🫕 | Comida                                                                               |
|             | 17:00 | 🫂 | Círculo de Cierre                                                                    |
|             | 18:00 | 💃 | "Micro Abierto" con TNT                                                              |
|             | 21:00 | 🥙 | Cena                                                                                 |
| **Lunes**   |       | 👨‍🌾 | Voluntariado para la recogida del espacio                                            |

Todas las actividades de la programación están incluidas en tu aportación
{.subtitle}

## ::📲:: Info

[[:whatsapp: Indira → 623 58 84 19]](https://wa.me/34623588419 "[nofollow whatsapp]")
[[:whatsapp: Xemi → 699 190 009]](https://wa.me/34699190009 "[nofollow whatsapp]")

## ::📝:: ¿Cómo asistir?

Las plazas son limitadas.

~~Rellena el siguiente formulario para reservar la tuya:~~

¡Plazas cubiertas!
