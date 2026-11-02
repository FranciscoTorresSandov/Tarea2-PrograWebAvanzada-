
// =========================================
// MÓDULO: RENDERIZADO DE LECTURAS
//
// Responsabilidades:
// - Crear filas mediante métodos del DOM.
// - Agregar filas con transición.
// - Actualizar estados de forma precisa.
// - Eliminar filas después de su transición.
// - Gestionar cancelaciones y movimiento reducido.
// =========================================

/**
 * Devuelve la clase Bootstrap correspondiente
 * al estado actual del libro.
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
 * Construye una celda con texto seguro.
 */
function crearCelda(texto) {
  const celda = document.createElement("td");

  celda.textContent = texto;

  return celda;
}

/**
 * Construye un botón con atributos data-*.
 *
 * Los atributos serán utilizados desde
 * el contenedor mediante delegación.
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

  boton.dataset.accion = accion;
  boton.dataset.id = id;

  return boton;
}

/**
 * Crea una fila completa de lectura.
 *
 * No utiliza innerHTML.
 */
export function crearFilaLectura(libro) {
  const fila = document.createElement("tr");

  fila.className = "fila-lectura entrando";

  fila.dataset.id = libro.id;

  // =====================================
  // COLUMNA: TÍTULO
  // =====================================

  const columnaTitulo = crearCelda(
    libro.titulo
  );

  // =====================================
  // COLUMNA: AUTORES
  // =====================================

  const columnaAutores = crearCelda(
    libro.autores.join(", ") ||
    "No disponibles"
  );

  // =====================================
  // COLUMNA: ESTADO
  // =====================================

  const columnaEstado = document.createElement(
    "td"
  );

  const etiquetaEstado = document.createElement(
    "span"
  );

  etiquetaEstado.dataset.campo = "estado";

  etiquetaEstado.className =
    `badge ${claseEstado(libro.estado)}`;

  etiquetaEstado.textContent = libro.estado;

  columnaEstado.append(etiquetaEstado);

  // =====================================
  // COLUMNA: ACCIONES
  // =====================================

  const columnaAcciones = document.createElement(
    "td"
  );

  const grupoBotones = document.createElement(
    "div"
  );

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

  // =====================================
  // CREAR FILA
  // =====================================

  fila.append(
    columnaTitulo,
    columnaAutores,
    columnaEstado,
    columnaAcciones
  );

  return fila;
}

/**
 * Inserta un libro y activa su animación
 * de entrada definida en CSS.
 */
export function agregarFilaLectura(
  contenedor,
  libro
) {
  const fila = crearFilaLectura(libro);

  contenedor.append(fila);

  // Separamos el estado inicial del final
  // para permitir la transición CSS.

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      if (fila.isConnected) {
        fila.classList.remove("entrando");
      }

    });

  });

  return fila;
}

/**
 * Actualiza solamente la etiqueta del estado
 * de la fila correspondiente.
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

  // Reiniciamos la animación visual
  // para cada cambio de estado.

  fila.classList.remove("actualizada");

  // Forzamos la lectura del diseño actual
  // para reiniciar la animación CSS.
  void fila.offsetWidth;

  fila.classList.add("actualizada");
}

/**
 * Convierte un tiempo CSS en milisegundos.
 *
 * Ejemplos:
 * "250ms" -> 250
 * "0.25s" -> 250
 */
function convertirTiempoMs(valor) {
  const texto = valor.trim();

  const numero = Number.parseFloat(texto);

  if (!Number.isFinite(numero)) {
    return 0;
  }

  if (texto.endsWith("ms")) {
    return numero;
  }

  if (texto.endsWith("s")) {
    return numero * 1000;
  }

  return 0;
}

/**
 * Obtiene duración y retraso de la transición
 * que afecta a la propiedad opacity.
 */
function obtenerDuracionOpacidad(fila) {
  const estilos = window.getComputedStyle(fila);

  const propiedades = estilos.transitionProperty
    .split(",")
    .map(valor => valor.trim());

  const duraciones = estilos.transitionDuration
    .split(",")
    .map(convertirTiempoMs);

  const retrasos = estilos.transitionDelay
    .split(",")
    .map(convertirTiempoMs);

  const indice = propiedades.findIndex(
    propiedad =>
      propiedad === "opacity" ||
      propiedad === "all"
  );

  if (
    indice === -1 ||
    duraciones.length === 0 ||
    retrasos.length === 0
  ) {
    return 0;
  }

  // CSS permite listas de longitudes distintas.
  // Sus valores se repiten cuando es necesario.

  const duracion =
    duraciones[indice % duraciones.length];

  const retraso =
    retrasos[indice % retrasos.length];

  return Math.max(
    0,
    duracion + retraso
  );
}

/**
 * Retira un libro después de su transición.
 *
 * Contempla:
 * - transitionend
 * - transitioncancel
 * - ausencia de evento
 * - preferencia de movimiento reducido
 *
 * El callback solo se ejecuta una vez.
 */
export function animarEliminacion(
  fila,
  alFinalizar
) {

  // Impide iniciar otra eliminación
  // sobre la misma fila.

  if (fila.classList.contains("saliendo")) {
    return;
  }

  // Desactivamos los botones durante
  // el proceso de eliminación.

  fila.querySelectorAll("button").forEach(
    boton => {
      boton.disabled = true;
    }
  );

  let finalizada = false;

  let temporizador = null;

  /**
   * Finaliza la operación una sola vez.
   */
  function finalizar() {

    if (finalizada) {
      return;
    }

    finalizada = true;

    // Eliminamos listeners temporales.

    fila.removeEventListener(
      "transitionend",
      manejarFinTransicion
    );

    fila.removeEventListener(
      "transitioncancel",
      manejarCancelacion
    );

    if (temporizador !== null) {
      window.clearTimeout(temporizador);
    }

    // Retiramos exclusivamente esta fila.

    fila.remove();

    // Notificamos al módulo principal
    // que puede actualizar el estado.

    alFinalizar();
  }

  /**
   * Atiende el fin de la opacidad
   * de la fila, no el de sus hijos.
   */
  function manejarFinTransicion(evento) {
    if (
      evento.target !== fila ||
      evento.propertyName !== "opacity"
    ) {
      return;
    }

    finalizar();
  }

  /**
   * Si la transición es cancelada,
   * completamos igualmente la operación.
   */
  function manejarCancelacion(evento) {
    if (
      evento.target !== fila ||
      evento.propertyName !== "opacity"
    ) {
      return;
    }

    finalizar();
  }

  // =====================================
  // PREFERENCIAS DE ACCESIBILIDAD
  // =====================================

  const movimientoReducido =
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (movimientoReducido) {
    finalizar();
    return;
  }

  // =====================================
  // REGISTRAR EVENTOS
  // =====================================

  fila.addEventListener(
    "transitionend",
    manejarFinTransicion
  );

  fila.addEventListener(
    "transitioncancel",
    manejarCancelacion
  );

  // Activamos la clase que define
  // la transición de salida.

  fila.classList.add("saliendo");

  // =====================================
  // RESPALDO POR AUSENCIA DE EVENTO
  // =====================================

  const duracion = obtenerDuracionOpacidad(
    fila
  );

  // Si no existe una transición efectiva,
  // no tiene sentido esperar un evento.

  if (duracion <= 0) {
    finalizar();
    return;
  }

  // Margen adicional para permitir
  // que el navegador emita transitionend.
  //
  // Este respaldo evita que la fila permanezca
  // indefinidamente en el DOM.

  temporizador = window.setTimeout(
    finalizar,
    duracion + 150
  );
}
