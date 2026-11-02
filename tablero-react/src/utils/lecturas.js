// =========================================
// UTILIDADES DE LECTURA
//
// Responsabilidades:
// - Estados de lectura.
// - Transformaciones inmutables.
// - Filtrado de libros.
// - Cálculo de estadísticas.
// =========================================

export const ESTADOS_LECTURA = Object.freeze([
  "Pendiente",
  "Leyendo",
  "Leído"
]);

/**
 * Obtiene el siguiente estado permitido.
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
 * Cambia un estado sin mutar el arreglo
 * ni el objeto original del libro.
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
 * Elimina un libro creando un arreglo nuevo.
 */
export function quitarLibro(libros, id) {
  return libros.filter(
    libro => libro.id !== id
  );
}

/**
 * Agrega un libro sin mutar el arreglo recibido.
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

/**
 * Filtra libros por estado y miembro.
 *
 * Los filtros se aplican simultáneamente.
 * "Todos" significa que no se restringe
 * por ese criterio.
 *
 * @returns {Array}
 */
export function filtrarLibros(
  libros,
  filtroEstado,
  filtroMiembro
) {
  return libros.filter(libro => {

    const coincideEstado =
      filtroEstado === "Todos" ||
      libro.estado === filtroEstado;

    const coincideMiembro =
      filtroMiembro === "Todos" ||
      libro.miembroId === filtroMiembro;

    return (
      coincideEstado &&
      coincideMiembro
    );

  });
}

/**
 * Calcula la cantidad de libros por estado.
 *
 * Devuelve siempre las tres categorías,
 * incluso si alguna tiene cero libros.
 *
 * No almacena ni modifica estado.
 */
export function resumirEstados(libros) {

  const resumen = {
    Pendiente: 0,
    Leyendo: 0,
    "Leído": 0
  };

  libros.forEach(libro => {

    if (
      Object.hasOwn(
        resumen,
        libro.estado
      )
    ) {
      resumen[libro.estado]++;
    }

  });

  return resumen;
}