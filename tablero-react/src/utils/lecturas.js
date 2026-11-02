// =========================================
// UTILIDADES DE LECTURA
//
// Responsabilidad:
// Transformar datos sin modificar
// los arreglos u objetos originales.
// =========================================

export const ESTADOS_LECTURA = Object.freeze([
  "Pendiente",
  "Leyendo",
  "Leído"
]);

/**
 * Calcula el siguiente estado de lectura.
 *
 * Pendiente -> Leyendo -> Leído -> Pendiente
 */
export function siguienteEstado(estadoActual) {
  const indiceActual = ESTADOS_LECTURA.indexOf(
    estadoActual
  );

  if (indiceActual === -1) {
    throw new Error(
      `Estado de lectura inválido: ${estadoActual}`
    );
  }

  const siguienteIndice =
    (indiceActual + 1) % ESTADOS_LECTURA.length;

  return ESTADOS_LECTURA[siguienteIndice];
}

/**
 * Devuelve una nueva lista con el estado
 * actualizado del libro seleccionado.
 *
 * No modifica el arreglo recibido.
 */
export function actualizarEstadoLectura(
  libros,
  id
) {
  return libros.map(libro => {

    if (libro.id !== id) {
      return libro;
    }

    return {
      ...libro,
      estado: siguienteEstado(libro.estado)
    };

  });
}

/**
 * Devuelve una lista nueva sin el libro
 * cuyo identificador coincide con id.
 */
export function quitarLibro(libros, id) {
  return libros.filter(
    libro => libro.id !== id
  );
}

/**
 * Agrega un libro creando un nuevo arreglo.
 *
 * Comprueba que el identificador no exista.
 */
export function agregarLibro(libros, nuevoLibro) {
  const duplicado = libros.some(
    libro => libro.id === nuevoLibro.id
  );

  if (duplicado) {
    throw new Error(
      "Ya existe un libro con ese identificador."
    );
  }

  return [
    ...libros,
    nuevoLibro
  ];
}