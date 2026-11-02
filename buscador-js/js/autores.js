
// =========================================
// MÓDULO: AUTORES DINÁMICOS
//
// Responsabilidades:
// - Agregar campos de autor.
// - Eliminar campos.
// - Respetar los límites 1 a 5.
// - Mantener IDs únicos.
// - Mantener etiquetas consecutivas.
// - Recuperar todos los autores.
// =========================================

const MIN_AUTORES = 1;
const MAX_AUTORES = 5;

// Este identificador sigue aumentando.
// No depende de la posición del campo.

let siguienteId = 2;

/**
 * Cuenta los controles de autor existentes.
 */
function contarAutores(contenedor) {
  return contenedor.querySelectorAll(
    ".autor-item"
  ).length;
}

/**
 * Renumera las etiquetas visibles.
 *
 * No modifica los identificadores HTML,
 * por lo que no genera IDs duplicados.
 */
function renumerarEtiquetas(contenedor) {
  const filas = contenedor.querySelectorAll(
    ".autor-item"
  );

  filas.forEach((fila, indice) => {
    const etiqueta = fila.querySelector("label");

    if (etiqueta) {
      etiqueta.textContent = `Autor ${indice + 1}`;
    }
  });
}

/**
 * Crea una fila completa con un campo
 * y un botón de eliminación.
 */
function crearCampoAutor() {
  const id = `autor-${siguienteId}`;

  siguienteId++;

  // Fila principal.

  const fila = document.createElement("div");

  fila.className = "autor-item row g-2 mb-3";

  // Columna del campo.

  const columnaCampo = document.createElement(
    "div"
  );

  columnaCampo.className = "col-12 col-md-9";

  // Etiqueta asociada al campo.

  const etiqueta = document.createElement(
    "label"
  );

  etiqueta.className = "form-label";
  etiqueta.htmlFor = id;
  etiqueta.textContent = "Autor";

  // Control obligatorio.

  const input = document.createElement("input");

  input.type = "text";
  input.id = id;
  input.name = "autores[]";

  input.className =
    "form-control campo-autor";

  input.required = true;
  input.minLength = 2;
  input.maxLength = 120;

  // Misma restricción del autor original.
  // Requiere al menos un carácter no blanco.

  input.pattern = ".*\\S.*";

  columnaCampo.append(
    etiqueta,
    input
  );

  // Columna del botón.

  const columnaBoton = document.createElement(
    "div"
  );

  columnaBoton.className =
    "col-12 col-md-3 d-flex align-items-start";

  const botonEliminar = document.createElement(
    "button"
  );

  botonEliminar.type = "button";

  botonEliminar.className =
    "btn btn-outline-danger w-100 mt-md-4";

  botonEliminar.dataset.accionAutor = "quitar";

  botonEliminar.textContent = "Quitar";

  columnaBoton.append(botonEliminar);

  fila.append(
    columnaCampo,
    columnaBoton
  );

  return fila;
}

/**
 * Actualiza la disponibilidad de los botones
 * y el contador de autores.
 */
function actualizarControles(
  contenedor,
  botonAgregar,
  contador
) {
  const cantidad = contarAutores(contenedor);

  botonAgregar.disabled =
    cantidad >= MAX_AUTORES;

  const botonesEliminar =
    contenedor.querySelectorAll(
      'button[data-accion-autor="quitar"]'
    );

  botonesEliminar.forEach((boton) => {
    boton.disabled =
      cantidad <= MIN_AUTORES;
  });

  renumerarEtiquetas(contenedor);

  contador.textContent =
    `${cantidad} de ${MAX_AUTORES} autores.`;
}

/**
 * Recupera todos los autores.
 *
 * El orden se corresponde con los campos
 * actualmente visibles en el formulario.
 */
export function obtenerAutores(formulario) {
  return Array.from(
    formulario.querySelectorAll(
      ".campo-autor"
    )
  ).map(
    campo => campo.value.trim()
  );
}

/**
 * Restablece un único campo después
 * de completar una propuesta.
 */
export function reiniciarAutores() {
  const contenedor = document.querySelector(
    "#contenedor-autores"
  );

  const botonAgregar = document.querySelector(
    "#btn-agregar-autor"
  );

  const contador = document.querySelector(
    "#contador-autores"
  );

  const filas = Array.from(
    contenedor.querySelectorAll(
      ".autor-item"
    )
  );

  // Dejamos solamente el primer campo
  // que permanezca actualmente en el DOM.

  filas.slice(1).forEach(
    fila => fila.remove()
  );

  const primerCampo = contenedor.querySelector(
    ".campo-autor"
  );

  if (primerCampo) {
    primerCampo.value = "";
    primerCampo.setCustomValidity("");
  }

  actualizarControles(
    contenedor,
    botonAgregar,
    contador
  );
}

/**
 * Registra los eventos de los autores.
 */
export function inicializarAutores() {
  const contenedor = document.querySelector(
    "#contenedor-autores"
  );

  const botonAgregar = document.querySelector(
    "#btn-agregar-autor"
  );

  const contador = document.querySelector(
    "#contador-autores"
  );

  // =====================================
  // AGREGAR UN AUTOR
  // =====================================

  botonAgregar.addEventListener(
    "click",
    () => {
      if (
        contarAutores(contenedor) >= MAX_AUTORES
      ) {
        return;
      }

      const nuevaFila = crearCampoAutor();

      contenedor.append(nuevaFila);

      actualizarControles(
        contenedor,
        botonAgregar,
        contador
      );

      // Lleva el foco al campo creado.

      nuevaFila.querySelector("input").focus();
    }
  );

  // =====================================
  // QUITAR UN AUTOR
  // =====================================

  // Una única escucha permite trabajar
  // con botones creados posteriormente.

  contenedor.addEventListener(
    "click",
    (evento) => {
      const boton = evento.target.closest(
        'button[data-accion-autor="quitar"]'
      );

      if (
        !boton ||
        !contenedor.contains(boton)
      ) {
        return;
      }

      if (
        contarAutores(contenedor) <= MIN_AUTORES
      ) {
        return;
      }

      const fila = boton.closest(
        ".autor-item"
      );

      if (!fila) {
        return;
      }

      fila.remove();

      actualizarControles(
        contenedor,
        botonAgregar,
        contador
      );

      // Evita que el foco quede asociado
      // a un botón que ya no existe.

      botonAgregar.focus();
    }
  );

  actualizarControles(
    contenedor,
    botonAgregar,
    contador
  );
}
