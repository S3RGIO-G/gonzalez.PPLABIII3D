
import { CrearTabla } from './tabla.js';
import { validarCampos, validarRadios, validarEventRadios } from './validaciones.js';
import {Anuncio_Auto} from './Entidades.js';



const arrayDatos = LeerStorage("anuncios");
const $divTabla = document.querySelector("#divTabla");
const $contenedor = document.querySelector("section");
const formulario = document.forms[0];
const { titulo, transaccion, descripcion, precio, puertas, kilometros, potencia } = formulario;
const spinner = document.querySelector('.spinner');
const fondoSpinner = document.querySelector('.fondoSpinner');
let seleccion = null;

ActualizarTabla();

for (let i = 0; i < formulario.length; i++) {
  let item = formulario[i];
  if (item.matches('input[type="text"]')) {
    item.addEventListener('blur', validarCampos);
    item.addEventListener('keyup', validarCampos);
  } else if (item.matches('input[type="radio"]')) {
    item.addEventListener('change', validarEventRadios);
  }
}

formulario.addEventListener('submit', (e) => { //Quito la posibilidad de que el usuario modifique el input a tipo submit
  e.preventDefault();
});

$contenedor.addEventListener('click', (e) => {
  const emisor = e.target;

  if (emisor.matches('tbody tr td')) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');
    setTimeout(() => {
      fondoSpinner.classList.remove('activarSpinner');
      spinner.classList.remove('activarSpinner');

      seleccion = arrayDatos.find((element) => element.id == parseInt(emisor.parentElement.dataset.id));
      setearCampos(seleccion);
      validarInputs(formulario)
      MostrarBotones();

    }, 3000);


  }
  else if (emisor.matches('[id="btnAgregar"]') && seleccion == null && validarInputs(formulario)) {
    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    setTimeout(() => {
      fondoSpinner.classList.remove('activarSpinner');
      spinner.classList.remove('activarSpinner');

      let transaccion = document.querySelector('input[name="transaccion"]:checked').value;

      let id = (arrayDatos.length > 0) ? arrayDatos[arrayDatos.length - 1].id + 1 : 0;

      arrayDatos.push(new Anuncio_Auto(titulo.value, transaccion, descripcion.value, precio.value, puertas.value, kilometros.value, potencia.value, id));
      GuardarStorage("anuncios", arrayDatos);
      resetearEstilos();
      resetearCampos();
      ActualizarTabla();

    }, 3000);

  }
  else if (emisor.matches('[id="btnCancelar"]')) {
    seleccion = null;
    resetearCampos();
    resetearEstilos();
    QuitarBotones();
  }
  else if (emisor.matches('[id="btnGuardar"]') && seleccion != null && validarInputs(formulario)) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    setTimeout(() => {
      fondoSpinner.classList.remove('activarSpinner');
      spinner.classList.remove('activarSpinner');

      const transaccion = document.querySelector('input[name="transaccion"]:checked').value;

      seleccion.titulo = titulo.value;
      seleccion.transaccion = transaccion;
      seleccion.descripcion = descripcion.value;
      seleccion.precio = precio.value;
      seleccion.puertas = puertas.value;
      seleccion.kilometros = kilometros.value;
      seleccion.potencia = potencia.value;

      resetearEstilos();
      resetearCampos();
      QuitarBotones();
      GuardarStorage("anuncios", arrayDatos);
      ActualizarTabla();

    }, 3000);

  }
  else if (emisor.matches("#btnEliminar") && seleccion != null) {

    fondoSpinner.classList.add('activarSpinner');
    spinner.classList.add('activarSpinner');

    setTimeout(() => {
      fondoSpinner.classList.remove('activarSpinner');
      spinner.classList.remove('activarSpinner');

      arrayDatos.splice(arrayDatos.indexOf(seleccion), 1);
      seleccion = null;
      resetearEstilos();
      resetearCampos();
      QuitarBotones();
      GuardarStorage("anuncios", arrayDatos);
      ActualizarTabla();

    }, 3000);

  }

});



function validarInputs(form) {
  for (let i = 0; i < form.length; i++) {
    const item = form[i];
    if (item.matches('input[type="text"]')) {
      validarCampos(form[i]);
    }
  }
  validarRadios(form.transaccion);

  for (let i = 0; i < form.length; i++) {
    const item = form[i];
    if (item.matches('input') && item.classList.contains('error')) {
      return false;
    }
  }
  return true;
}


//#region RESET
function resetearEstilos() {
  const listChecks = document.querySelectorAll('.form__group-check');
  const listRadioChecks = document.querySelectorAll('.form__validation-icon-radio-check');
  const listWrongs = document.querySelectorAll('.form__group-wrong'); //Para cuando se elimina
  const listParraf = document.querySelectorAll('.form__input-error-activo');

  listChecks.forEach(element => {
    element.classList.remove('form__group-check');
  });
  listWrongs.forEach(element => {
    element.classList.remove('form__group-wrong');
  });
  listParraf.forEach(element => {
    element.classList.remove('form__input-error-activo');
  });
  listRadioChecks.forEach(element => {
    element.classList.remove('form__validation-icon-radio-check');
  });
}

function resetearCampos() {
  titulo.value = "";
  descripcion.value = "";
  transaccion[0].checked = false;
  transaccion[1].checked = false;
  precio.value = "";
  puertas.value = "";
  kilometros.value = "";
  potencia.value = "";
}

function setearCampos(item) {
  titulo.value = item.titulo;
  descripcion.value = item.descripcion;
  (item.transaccion == "venta") ? transaccion[0].checked = true : transaccion[0].checked = false;
  (item.transaccion == "alquiler") ? transaccion[1].checked = true : transaccion[1].checked = false;
  precio.value = item.precio;
  puertas.value = item.puertas;
  kilometros.value = item.kilometros;
  potencia.value = item.potencia;
}
//#endregion

//#region BOTONES
function MostrarBotones() {
  document.querySelector("#btnAgregar").classList.add("ocultar");
  document.querySelector("#btnGuardar").classList.remove("ocultar");
  document.querySelector("#btnEliminar").classList.remove("ocultar");
}

function QuitarBotones() {
  document.querySelector("#btnAgregar").classList.remove("ocultar");
  document.querySelector("#btnGuardar").classList.add("ocultar");
  document.querySelector("#btnEliminar").classList.add("ocultar");
}

//#endregion

//#region TABLA
function ActualizarTabla() {
  EliminarTabla();
  $divTabla.appendChild(CrearTabla(arrayDatos));
}
function EliminarTabla() {
  if ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.lastChild);
  }
}
//#endregion 

//#region STORAGE
function LeerStorage(nameData) {
  let data = JSON.parse(localStorage.getItem(nameData));

  if (!Array.isArray(data)) data = [];

  return data;
}

function GuardarStorage(nameData, data) {
  localStorage.setItem(nameData, JSON.stringify(data));
}


//#endregion 
