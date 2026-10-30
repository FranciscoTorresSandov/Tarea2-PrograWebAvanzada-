// =========================================
// MÓDULO: RENDERIZADO
// Responsabilidad:
// Crear elementos visuales mediante el DOM.
// =========================================

const PORTADA_ALTERNATIVA =
  "/portada-alternativa.svg";

/**
 * Crea un elemento HTML y aplica sus clases.
 *
 * El texto se inserta con textContent,
 * nunca como HTML recibido desde la API.
 */
function crearElemento(etiqueta, clases, texto) {

  const elemento = document.createElement(etiqueta);

  if (clases) {
    elemento.className = clases;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

/**
 * Construye una tarjeta de libro.
 *
 * @param {Object} libro
 * @returns {HTMLElement}
 */
function crearTarjetaLibro(libro) {

  const tarjeta = crearElemento(
    "article",
    "card tarjeta-libro shadow-sm"
  );

  // Imagen del libro.

  const imagen = crearElemento(
    "img",
    "card-img-top tarjeta-portada"
  );

  imagen.src = libro.portada;
  imagen.alt = `Portada de ${libro.titulo}`;
  imagen.loading = "lazy";

  // Si la portada remota falla,
  // utilizamos nuestra imagen local.

  imagen.addEventListener(
    "error",
    () => {
      imagen.src = PORTADA_ALTERNATIVA;
    },
    { once: true }
  );

  // Contenedor de contenido.

  const cuerpo = crearElemento(
    "div",
    "card-body"
  );

  const titulo = crearElemento(
    "h3",
    "card-title fs-5",
    libro.titulo
  );

  const autores = crearElemento(
    "p",
    "card-text",
    `Autores: ${
      libro.autores.join(", ") || "No disponibles"
    }`
  );

  const anio = crearElemento(
    "p",
    "card-text text-secondary",
    `Primera publicación: ${libro.anio ?? "N/D"}`
  );

  // Contenedor de acciones.

  const acciones = crearElemento(
    "div",
    "tarjeta-acciones"
  );

  // En este commit únicamente abrimos detalles.
  // El botón para agregar libros llegará en el 05.

  const botonDetalle = crearElemento(
    "button",
    "btn btn-outline-primary btn-sm",
    "Ver detalles"
  );

  botonDetalle.type = "button";

  botonDetalle.dataset.accion = "detalle";
  botonDetalle.dataset.id = libro.id;

  botonDetalle.setAttribute(
    "data-bs-toggle",
    "modal"
  );

  botonDetalle.setAttribute(
    "data-bs-target",
    "#modal-libro"
  );

  acciones.append(botonDetalle);

  cuerpo.append(
    titulo,
    autores,
    anio,
    acciones
  );

  tarjeta.append(
    imagen,
    cuerpo
  );

  return tarjeta;
}

/**
 * Renderiza únicamente los resultados
 * de la búsqueda actual.
 */
export function renderizarResultados(
  contenedor,
  libros
) {

  const tarjetas = libros.map(
    libro => crearTarjetaLibro(libro)
  );

  contenedor.replaceChildren(...tarjetas);
}

/**
 * Actualiza el contenido del modal.
 */
export function mostrarDetalle(libro) {

  const titulo = document.querySelector(
    "#detalle-titulo"
  );

  const autores = document.querySelector(
    "#detalle-autores"
  );

  const anio = document.querySelector(
    "#detalle-anio"
  );

  const imagen = document.querySelector(
    "#detalle-portada"
  );

  titulo.textContent = libro.titulo;

  autores.textContent =
    libro.autores.join(", ") || "No disponibles";

  anio.textContent = libro.anio ?? "N/D";

  imagen.src = libro.portada;
  imagen.alt = `Portada de ${libro.titulo}`;
}