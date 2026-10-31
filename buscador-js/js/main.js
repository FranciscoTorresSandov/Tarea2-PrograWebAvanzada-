// =========================================
// MÓDULO PRINCIPAL
// Coordina la comunicación entre módulos.
// =========================================

import "bootstrap";

// Acceso a la API.

import {
  buscarLibros
} from "./api.js";

// Renderizado del catálogo.

import {
  renderizarResultados,
  mostrarDetalle
} from "./render.js";

// Estado de la lista de lecturas.

import {
  obtenerLecturas,
  agregarLectura,
  cambiarEstado,
  eliminarLectura
} from "./lecturas.js";

// Renderizado de la lista de lecturas.

import {
  agregarFilaLectura,
  actualizarEstadoFila,
  animarEliminacion
} from "./render-lecturas.js";

// Formulario de propuestas.

import {
  iniciarFormularioPropuesta
} from "./formulario.js";

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

const tablaLecturas = document.querySelector(
  "#tabla-lecturas"
);

const lecturasVacias = document.querySelector(
  "#lecturas-vacias"
);

const avisoGeneral = document.querySelector(
  "#aviso-general"
);

// =========================================
// ESTADO DE LA BÚSQUEDA ACTUAL
// =========================================

let librosActuales = [];

// =========================================
// FUNCIONES AUXILIARES DE INTERFAZ
// =========================================

/**
 * Muestra uno de los estados de búsqueda.
 */
function mostrarEstadoBusqueda(
  tipo,
  mensaje
) {

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

/**
 * Muestra notificaciones sobre lecturas.
 */
function mostrarAviso(
  mensaje,
  tipo = "info"
) {

  avisoGeneral.className =
    `alert alert-${tipo}`;

  avisoGeneral.textContent = mensaje;
}

/**
 * Actualiza el mensaje de lista vacía.
 */
function actualizarListaVacia() {

  const cantidad = obtenerLecturas().length;

  lecturasVacias.hidden = cantidad > 0;
}

// =========================================
// BÚSQUEDA DE LIBROS
// =========================================

formulario.addEventListener(
  "submit",
  async (evento) => {

    evento.preventDefault();

    const texto = campoBusqueda.value.trim();

    if (!texto) {

      mostrarEstadoBusqueda(
        "error",
        "Debes escribir un título o autor."
      );

      return;
    }

    botonBuscar.disabled = true;

    mostrarEstadoBusqueda(
      "carga",
      "Buscando libros en Open Library..."
    );

    resultados.replaceChildren();
    librosActuales = [];

    try {

      const libros = await buscarLibros(texto);

      librosActuales = libros;

      if (libros.length === 0) {

        mostrarEstadoBusqueda(
          "vacio",
          "No se encontraron libros."
        );

        return;
      }

      renderizarResultados(
        resultados,
        libros
      );

      mostrarEstadoBusqueda(
        "resultados",
        `Se encontraron ${libros.length} resultados.`
      );

    } catch (error) {

      console.error(
        "Error al consultar Open Library:",
        error
      );

      mostrarEstadoBusqueda(
        "error",
        "No se pudo realizar la búsqueda. Intenta nuevamente."
      );

    } finally {

      botonBuscar.disabled = false;

    }

  }
);

// =========================================
// EVENTOS DEL CATÁLOGO
// =========================================

// Delegación de eventos en los resultados.
//
// No registramos una escucha de clic
// individual para cada tarjeta.

resultados.addEventListener(
  "click",
  (evento) => {

    const boton = evento.target.closest(
      "button[data-accion]"
    );

    if (
      !boton ||
      !resultados.contains(boton)
    ) {
      return;
    }

    const id = boton.dataset.id;

    const libro = librosActuales.find(
      item => item.id === id
    );

    if (!libro) {
      return;
    }

    const accion = boton.dataset.accion;

    // Acción: mostrar detalles.

    if (accion === "detalle") {
      mostrarDetalle(libro);
      return;
    }

    // Acción: agregar lectura.

    if (accion === "agregar") {

      const agregado = agregarLectura(libro);

      if (!agregado) {

        mostrarAviso(
          "Este libro ya existe en tu lista.",
          "warning"
        );

        return;
      }

      // Actualizamos solamente la nueva fila.

      const lecturaAgregada = {
        ...libro,
        estado: "Pendiente"
      };

      agregarFilaLectura(
        tablaLecturas,
        lecturaAgregada
      );

      actualizarListaVacia();

      // Inicializar validaciones del formulario.
      iniciarFormularioPropuesta();

      mostrarAviso(
        `"${libro.titulo}" se agregó correctamente.`,
        "success"
      );

    }

  }
);

// =========================================
// EVENTOS DE LA LISTA DE LECTURAS
// =========================================

// Existe UNA sola escucha de clic en tbody.
// Los botones se identifican mediante
// data-accion y data-id.

tablaLecturas.addEventListener(
  "click",
  (evento) => {

    const boton = evento.target.closest(
      "button[data-accion]"
    );

    if (
      !boton ||
      !tablaLecturas.contains(boton)
    ) {
      return;
    }

    const fila = boton.closest(
      "tr[data-id]"
    );

    if (!fila || !tablaLecturas.contains(fila)) {
      return;
    }

    // Comprobamos que el botón corresponde
    // realmente a la fila sobre la que actuamos.

    const id = fila.dataset.id;

    if (boton.dataset.id !== id) {
      return;
    }

    const accion = boton.dataset.accion;

    // Acción: cambiar estado.

    if (accion === "estado") {

      const nuevoEstado = cambiarEstado(id);

      if (!nuevoEstado) {
        return;
      }

      actualizarEstadoFila(
        fila,
        nuevoEstado
      );

      mostrarAviso(
        `Estado actualizado a: ${nuevoEstado}.`,
        "info"
      );

      return;
    }

    // Acción: quitar una lectura.

    if (accion === "quitar") {

      // Primero ejecutamos la transición.
      // Al finalizar, retiramos el registro
      // del estado en memoria.

      animarEliminacion(
        fila,
        () => {

          eliminarLectura(id);

          actualizarListaVacia();

          mostrarAviso(
            "El libro se eliminó de la lista.",
            "success"
          );

        }
      );

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

// =========================================
// INICIALIZACIÓN
// =========================================

actualizarListaVacia();