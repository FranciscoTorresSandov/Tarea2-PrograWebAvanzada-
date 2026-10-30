// =========================================
// MÓDULO: RENDERIZADO DE LECTURAS
// Responsabilidad:
// Crear y actualizar filas de la tabla.
// =========================================

/**
 * Devuelve la clase Bootstrap correspondiente
 * al estado de una lectura.
 */
function claseEstado(estado) {

  const clases = {
    Pendiente: "text-bg-warning",
    Leyendo: "text-bg-info",
    "Leído": "text-bg-success"
  };

  return clases[estado] ?? "text-bg-secondary";
}

/**
 * Crea una celda de tabla con contenido textual.
 */
function crearCelda(texto) {

  const celda = document.createElement("td");

  celda.textContent = texto;

  return celda;
}

/**
 * Crea un botón de acción.
 */
function crearBoton(
  texto,
  accion,
  id,
  clases
) {

  const boton = document.createElement("button");

  boton.type = "button";

  boton.className = clases;
  boton.textContent = texto;

  // Estos atributos serán utilizados
  // por la delegación de eventos.

  boton.dataset.accion = accion;
  boton.dataset.id = id;

  return boton;
}

/**
 * Construye una fila de la tabla.
 *
 * No inserta cadenas HTML.
 * Utiliza únicamente métodos del DOM.
 */
export function crearFilaLectura(libro) {

  const fila = document.createElement("tr");

  fila.className = "fila-lectura entrando";
  fila.dataset.id = libro.id;

  // Primera columna: título.

  const columnaTitulo = crearCelda(
    libro.titulo
  );

  // Segunda columna: autores.

  const columnaAutores = crearCelda(
    libro.autores.join(", ") || "No disponibles"
  );

  // Tercera columna: estado.

  const columnaEstado = document.createElement("td");

  const etiquetaEstado = document.createElement("span");

  etiquetaEstado.dataset.campo = "estado";

  etiquetaEstado.className =
    `badge ${claseEstado(libro.estado)}`;

  etiquetaEstado.textContent = libro.estado;

  columnaEstado.append(etiquetaEstado);

  // Cuarta columna: acciones.

  const columnaAcciones = document.createElement("td");

  const grupoBotones = document.createElement("div");

  grupoBotones.className =
    "d-flex flex-wrap gap-2";

  const botonEstado = crearBoton(
    "Cambiar estado",
    "estado",
    libro.id,
    "btn btn-outline-primary btn-sm"
  );

  const botonEliminar = crearBoton(
    "Quitar",
    "quitar",
    libro.id,
    "btn btn-outline-danger btn-sm"
  );

  grupoBotones.append(
    botonEstado,
    botonEliminar
  );

  columnaAcciones.append(grupoBotones);

  // Incorporamos todas las columnas.

  fila.append(
    columnaTitulo,
    columnaAutores,
    columnaEstado,
    columnaAcciones
  );

  return fila;
}

/**
 * Inserta una nueva fila y activa
 * su transición de entrada.
 */
export function agregarFilaLectura(
  contenedor,
  libro
) {

  const fila = crearFilaLectura(libro);

  contenedor.append(fila);

  // Dos cuadros de renderizado permiten que
  // el navegador registre primero el estado
  // inicial de la transición.

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {
      fila.classList.remove("entrando");
    });

  });

  return fila;
}

/**
 * Actualiza exclusivamente la etiqueta visual
 * del estado en una fila existente.
 */
export function actualizarEstadoFila(
  fila,
  nuevoEstado
) {

  const etiqueta = fila.querySelector(
    '[data-campo="estado"]'
  );

  if (!etiqueta) {
    return;
  }

  etiqueta.textContent = nuevoEstado;

  etiqueta.className =
    `badge ${claseEstado(nuevoEstado)}`;

  // Reiniciamos la animación de actualización.

  fila.classList.remove("actualizada");

  // La lectura del tamaño fuerza al navegador
  // a reconocer el cambio de clase anterior.
  void fila.offsetWidth;

  fila.classList.add("actualizada");
}

/**
 * Ejecuta una transición de salida.
 *
 * Solo retira el elemento del DOM cuando
 * finaliza la transición de opacidad.
 *
 * @param {HTMLElement} fila
 * @param {Function} alFinalizar
 */
export function animarEliminacion(
  fila,
  alFinalizar
) {

  // Evita iniciar dos eliminaciones simultáneas.
  if (fila.classList.contains("saliendo")) {
    return;
  }

  // Deshabilitamos las acciones mientras
  // se está eliminando la fila.

  fila.querySelectorAll("button").forEach(
    boton => {
      boton.disabled = true;
    }
  );

  const finalizar = () => {
    fila.remove();
    alFinalizar();
  };

  // Respetamos a usuarios que prefieren
  // movimiento reducido.

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (movimientoReducido) {
    finalizar();
    return;
  }

  function manejarFinTransicion(evento) {

    // transitionend puede propagarse desde
    // elementos hijos. Solo nos interesa
    // la transición de opacidad de esta fila.

    if (
      evento.target !== fila ||
      evento.propertyName !== "opacity"
    ) {
      return;
    }

    fila.removeEventListener(
      "transitionend",
      manejarFinTransicion
    );

    finalizar();
  }

  fila.addEventListener(
    "transitionend",
    manejarFinTransicion
  );

  fila.classList.add("saliendo");
}