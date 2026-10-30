// =========================================
// MÓDULO: ACCESO A OPEN LIBRARY
// Responsabilidad:
// Consultar libros y normalizar la respuesta.
// =========================================

const URL_BUSQUEDA =
  "https://openlibrary.org/search.json";

const PORTADA_ALTERNATIVA =
  "/portada-alternativa.svg";

/**
 * Obtiene libros desde Open Library.
 *
 * @param {string} texto - Título o autor solicitado.
 * @returns {Promise<Array>} Lista normalizada de libros.
 */
export async function buscarLibros(texto) {

  // Construimos la URL utilizando parámetros
  // codificados correctamente.

  const url = new URL(URL_BUSQUEDA);

  url.searchParams.set("q", texto.trim());
  url.searchParams.set("limit", "12");

  // La petición es asincrónica.
  const respuesta = await fetch(url.toString());

  // fetch no considera automáticamente
  // un HTTP 404 o 500 como rechazo de promesa.

  if (!respuesta.ok) {
    throw new Error(
      `Error HTTP ${respuesta.status}`
    );
  }

  // Convertimos el cuerpo JSON a un objeto.
  const datos = await respuesta.json();

  // Validamos la estructura recibida.
  if (!Array.isArray(datos.docs)) {
    throw new Error(
      "La API devolvió un formato inesperado."
    );
  }

  // Convertimos los datos externos a
  // una estructura controlada por nosotros.

  return datos.docs.map((item, indice) => {

    const titulo =
      typeof item.title === "string"
        ? item.title
        : "Título desconocido";

    const autores = Array.isArray(item.author_name)
      ? item.author_name
      : [];

    const anio = Number.isInteger(
      item.first_publish_year
    )
      ? item.first_publish_year
      : null;

    const portada = Number.isInteger(item.cover_i)
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : PORTADA_ALTERNATIVA;

    return {
      id: item.key || `sin-clave-${indice}`,
      titulo,
      autores,
      anio,
      portada
    };

  });

}