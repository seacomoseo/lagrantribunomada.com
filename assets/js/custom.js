// ALTA
const formAlta = document.getElementById('form_alta_header')
if (formAlta) {
  // When form alta is submit
  document.addEventListener('submited_form_alta_header', e => {
    window.location = '/bienvenida/'
  })
}