// =========================================
// MÓDULO: ESTADO DE LECTURAS
// Responsabilidad:
// Administrar la colección en memoria.
// =========================================

// Estados permitidos por la consigna.

export const ESTADOS_LECTURA = Object.freeze([
  "Pendiente",
  "Leyendo",
  "Leído"
]);

// Map almacena cada libro utilizando
// su identificador como clave.
//
// Esto permite verificar duplicados
// sin recorrer toda la colección.

const lecturas = new Map();

/**
 * Devuelve los libros registrados.
 *
 * @returns {Array}
 */
export function obtenerLecturas() {
  return Array.from(lecturas.values());
}

/**
 * Agrega un libro con estado Pendiente.
 *
 * @returns {boolean}
 * true si se agregó correctamente.
 * false si el libro ya existía.
 */
export function agregarLectura(libro) {

  if (lecturas.has(libro.id)) {
    return false;
  }

  const nuevaLectura = {
    ...libro,
    estado: "Pendiente"
  };

  lecturas.set(
    libro.id,
    nuevaLectura
  );

  return true;
}

/**
 * Cambia al siguiente estado.
 *
 * Pendiente -> Leyendo -> Leído -> Pendiente
 *
 * @returns {string|null}
 */
export function cambiarEstado(id) {

  const libro = lecturas.get(id);

  if (!libro) {
    return null;
  }

  const posicionActual = ESTADOS_LECTURA.indexOf(
    libro.estado
  );

  const siguientePosicion =
    (posicionActual + 1) % ESTADOS_LECTURA.length;

  libro.estado = ESTADOS_LECTURA[
    siguientePosicion
  ];

  return libro.estado;
}

/**
 * Elimina una lectura del estado en memoria.
 */
export function eliminarLectura(id) {
  return lecturas.delete(id);
}