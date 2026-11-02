// =========================================
// VALIDACIÓN DE LIBROS EN REACT
//
// Responsabilidades:
// - Comprobar campos del formulario.
// - Devolver errores por campo.
// - Normalizar datos para crear un libro.
// =========================================

/**
 * Valida los datos introducidos.
 *
 * @param {Object} datos
 * @param {Array} miembros
 * @returns {Object} Errores identificados por campo.
 */
export function validarDatosLibro(
  datos,
  miembros
) {
  const errores = {};

  const titulo = datos.titulo.trim();
  const autor = datos.autor.trim();
  const anioTexto = datos.anio.trim();
  const miembroId = datos.miembroId;

  // =====================================
  // VALIDACIÓN DEL TÍTULO
  // =====================================

  if (!titulo) {
    errores.titulo = "El título es obligatorio.";

  } else if (titulo.length < 2) {
    errores.titulo =
      "El título debe tener al menos 2 caracteres.";

  } else if (titulo.length > 150) {
    errores.titulo =
      "El título no puede superar 150 caracteres.";
  }

  // =====================================
  // VALIDACIÓN DEL AUTOR
  // =====================================

  if (!autor) {
    errores.autor = "El autor es obligatorio.";

  } else if (autor.length < 2) {
    errores.autor =
      "El autor debe tener al menos 2 caracteres.";

  } else if (autor.length > 120) {
    errores.autor =
      "El autor no puede superar 120 caracteres.";
  }

  // =====================================
  // VALIDACIÓN DEL AÑO
  // =====================================

  const anioActual = new Date().getFullYear();

  if (!anioTexto) {
    errores.anio =
      "El año de publicación es obligatorio.";

  } else if (!/^\d+$/.test(anioTexto)) {
    errores.anio =
      "El año debe ser un número entero positivo.";

  } else {

    const anio = Number(anioTexto);

    if (
      !Number.isSafeInteger(anio) ||
      anio < 1
    ) {
      errores.anio =
        "Introduce un año válido mayor que cero.";

    } else if (anio > anioActual) {
      errores.anio =
        "El año no puede ser posterior al actual.";
    }
  }

  // =====================================
  // VALIDACIÓN DEL MIEMBRO
  // =====================================

  if (!miembroId) {
    errores.miembroId =
      "Debes seleccionar un miembro.";

  } else {

    const miembroExiste = miembros.some(
      miembro => miembro.id === miembroId
    );

    if (!miembroExiste) {
      errores.miembroId =
        "El miembro seleccionado no existe.";
    }
  }

  return errores;
}

/**
 * Construye el objeto final del libro.
 *
 * Se llama solamente después de validar
 * los campos del formulario.
 */
export function crearLibroDesdeFormulario(
  datos,
  id
) {
  return {
    id,
    titulo: datos.titulo.trim(),
    autor: datos.autor.trim(),
    anio: Number(datos.anio),
    estado: "Pendiente",
    miembroId: datos.miembroId
  };
}