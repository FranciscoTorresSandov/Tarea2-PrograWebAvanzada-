// =========================================
// MÓDULO: API DE PROPUESTAS
// Responsabilidad:
// Simular el registro de un libro mediante POST.
// =========================================

const URL_PROPUESTAS =
  "https://jsonplaceholder.typicode.com/posts";

/**
 * Envía una propuesta a JSONPlaceholder.
 *
 * @param {Object} propuesta
 * @returns {Promise<Object>}
 */
export async function enviarPropuesta(propuesta) {

  // JSONPlaceholder simula publicaciones.
  // Adaptamos nuestra propuesta a un objeto
  // JSON que contiene todos los datos.

  const cuerpo = {
    title: propuesta.titulo,
    body: propuesta.motivo,
    userId: 1,

    autores: propuesta.autores,
    anio: propuesta.anio,
    paginas: propuesta.paginas,
    genero: propuesta.genero,
    correo: propuesta.correo,
    fechaSesion: propuesta.fechaSesion
  };

  const respuesta = await fetch(
    URL_PROPUESTAS,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },

      body: JSON.stringify(cuerpo)
    }
  );

  // Un error HTTP requiere una comprobación
  // explícita de response.ok.

  if (!respuesta.ok) {
    throw new Error(
      `Error HTTP ${respuesta.status}`
    );
  }

  const datos = await respuesta.json();

  return datos;
}