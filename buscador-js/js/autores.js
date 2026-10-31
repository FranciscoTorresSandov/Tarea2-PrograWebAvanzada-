// =========================================
// MÓDULO: AUTORES DINÁMICOS
// Responsabilidades:
// - Crear campos de autor.
// - Eliminar campos.
// - Respetar mínimo 1 y máximo 5.
// - Mantener identificadores únicos.
// =========================================

const MIN_AUTORES = 1;
const MAX_AUTORES = 5;

// Contador independiente de la cantidad
// actual de autores.
//
// Así evitamos repetir identificadores
// cuando el usuario elimina y agrega campos.

let siguienteId = 2;

/**
 * Devuelve el número actual de autores.
 */
function contarAutores(contenedor) {
  return contenedor.querySelectorAll(
    ".autor-item"
  ).length;
}

/**
 * Crea un campo de autor con su etiqueta
 * y botón de eliminación.
 */
function crearCampoAutor() {
  const id = `autor-${siguienteId}`;

  const numero = siguienteId;

  siguienteId++;

  // Contenedor general de la fila.

  const fila = document.createElement("div");

  fila.className =
    "autor-item row g-2 mb-3";

  // Columna del campo.

  const columnaCampo = document.createElement("div");

  columnaCampo.className =
    "col-12 col-md-9";

  // Etiqueta accesible.

  const etiqueta = document.createElement("label");

  etiqueta.className = "form-label";
  etiqueta.htmlFor = id;
  etiqueta.textContent = `Autor ${numero}`;

  // Campo de texto.

  const input = document.createElement("input");

  input.type = "text";
  input.id = id;
  input.name = "autores[]";

  input.className =
    "form-control campo-autor";

  input.required = true;
  input.minLength = 2;
  input.maxLength = 120;

  columnaCampo.append(
    etiqueta,
    input
  );

  // Columna del botón.

  const columnaBoton = document.createElement("div");

  columnaBoton.className =
    "col-12 col-md-3 d-flex align-items-start";

  const boton = document.createElement("button");

  boton.type = "button";

  boton.className =
    "btn btn-outline-danger w-100 mt-md-4";

  boton.dataset.accionAutor = "quitar";
  boton.textContent = "Quitar";

  columnaBoton.append(boton);

  fila.append(
    columnaCampo,
    columnaBoton
  );

  return fila;
}

/**
 * Actualiza botones y contador visual.
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

  contador.textContent =
    `${cantidad} de ${MAX_AUTORES} autores.`;
}

/**
 * Recupera los autores introducidos.
 */
export function obtenerAutores(formulario) {
  return Array.from(
    formulario.querySelectorAll(".campo-autor")
  ).map(
    campo => campo.value.trim()
  );
}

/**
 * Deja un único campo después de un envío.
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
    contenedor.querySelectorAll(".autor-item")
  );

  // Conservamos la primera fila existente.

  filas.slice(1).forEach(
    fila => fila.remove()
  );

  actualizarControles(
    contenedor,
    botonAgregar,
    contador
  );
}

/**
 * Registra las interacciones de autores.
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

  // Agregar un autor.

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

      // Situamos el foco en el nuevo campo.

      nuevaFila.querySelector("input").focus();
    }
  );

  // Delegación para eliminar autores.
  //
  // Una sola escucha controla todos
  // los botones existentes y futuros.

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

    }
  );

  // Estado inicial.

  actualizarControles(
    contenedor,
    botonAgregar,
    contador
  );
}