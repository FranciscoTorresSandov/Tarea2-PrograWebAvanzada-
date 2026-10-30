// =========================================
// MÓDULO PRINCIPAL
// Coordina eventos, API y renderizado.
// =========================================

import "bootstrap";

import {
  buscarLibros
} from "./api.js";

import {
  renderizarResultados,
  mostrarDetalle
} from "./render.js";

// =========================================
// REFERENCIAS AL DOM
// =========================================

const formulario = document.querySelector(
  "#form-busqueda"
);

const campoBusqueda = document.querySelector(
  "#texto-busqueda"
);

const botonBuscar = document.querySelector(
  "#btn-buscar"
);

const estadoBusqueda = document.querySelector(
  "#estado-busqueda"
);

const resultados = document.querySelector(
  "#resultados"
);

// Resultados de la búsqueda actual.
// Se mantienen en memoria.

let librosActuales = [];

// =========================================
// ESTADOS VISUALES
// =========================================

function mostrarEstado(tipo, mensaje) {

  const clases = {
    carga: "alert-info",
    error: "alert-danger",
    vacio: "alert-warning",
    resultados: "alert-success"
  };

  estadoBusqueda.className =
    `alert mt-4 ${clases[tipo]}`;

  estadoBusqueda.textContent = mensaje;
}

// =========================================
// ENVÍO DEL FORMULARIO DE BÚSQUEDA
// =========================================

formulario.addEventListener(
  "submit",
  async (evento) => {

    // Evitamos la recarga de la página.
    evento.preventDefault();

    const texto = campoBusqueda.value.trim();

    if (!texto) {
      mostrarEstado(
        "error",
        "Debes escribir un título o autor."
      );

      return;
    }

    // Bloqueamos el botón durante la petición.
    botonBuscar.disabled = true;

    mostrarEstado(
      "carga",
      "Buscando libros en Open Library..."
    );

    resultados.replaceChildren();
    librosActuales = [];

    try {

      const libros = await buscarLibros(texto);

      librosActuales = libros;

      if (libros.length === 0) {

        mostrarEstado(
          "vacio",
          "No se encontraron libros."
        );

        return;
      }

      renderizarResultados(
        resultados,
        libros
      );

      mostrarEstado(
        "resultados",
        `Se encontraron ${libros.length} resultados.`
      );

    } catch (error) {

      console.error(
        "Error durante la búsqueda:",
        error
      );

      mostrarEstado(
        "error",
        "No se pudo consultar Open Library. Intenta nuevamente."
      );

    } finally {

      // Se ejecuta tanto si hubo éxito
      // como si ocurrió un error.

      botonBuscar.disabled = false;

    }

  }
);

// =========================================
// EVENTOS DE LAS TARJETAS
// =========================================

// Una sola escucha gestiona los botones
// creados dinámicamente en los resultados.

resultados.addEventListener(
  "click",
  (evento) => {

    const boton = evento.target.closest(
      "button[data-accion]"
    );

    if (!boton || !resultados.contains(boton)) {
      return;
    }

    const id = boton.dataset.id;

    const libro = librosActuales.find(
      item => item.id === id
    );

    if (!libro) {
      return;
    }

    if (boton.dataset.accion === "detalle") {
      mostrarDetalle(libro);
    }

  }
);

// =========================================
// PORTADA ALTERNATIVA DEL MODAL
// =========================================

const portadaModal = document.querySelector(
  "#detalle-portada"
);

portadaModal.addEventListener(
  "error",
  () => {
    if (!portadaModal.src.endsWith(
      "/portada-alternativa.svg"
    )) {
      portadaModal.src =
        "/portada-alternativa.svg";
    }
  }
);