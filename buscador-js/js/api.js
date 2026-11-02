
// =========================================
// MÓDULO: ACCESO A OPEN LIBRARY
//
// Responsabilidades:
// - Consultar la API pública.
// - Verificar respuestas HTTP.
// - Normalizar datos externos.
// - Generar identificadores estables.
// =========================================

const URL_BUSQUEDA =
  "https://openlibrary.org/search.json";

const PORTADA_ALTERNATIVA =
  "/portada-alternativa.svg";

/**
 * Crea un identificador basado en los datos
 * de una obra si Open Library no proporciona
 * una clave oficial.
 *
 * Esta alternativa es determinista:
 * los mismos datos producen el mismo ID.
 *
 * No sustituye la identidad oficial de la API.
 */
function crearIdentificadorAlternativo(
  titulo,
  autores,
  anio,
  idPortada
) {

  const autoresOrdenados = [...autores]
    .map(autor => autor.toLocaleLowerCase("es"))
    .sort();

  const firma = JSON.stringify([
    titulo.toLocaleLowerCase("es"),
    autoresOrdenados,
    anio,
    idPortada
  ]);

  return `sin-clave:${encodeURIComponent(firma)}`;
}

/**
 * Normaliza un resultado individual.
 *
 * Esta función no necesita el DOM ni fetch,
 * por lo que también puede probarse
 * mediante pruebas unitarias.
 */
export function normalizarLibro(item) {

  if (
    item === null ||
    typeof item !== "object" ||
    Array.isArray(item)
  ) {
    throw new TypeError(
      "El documento recibido no es un libro válido."
    );
  }

  // =====================================
  // TÍTULO
  // =====================================

  const titulo =
    typeof item.title === "string" &&
    item.title.trim() !== ""
      ? item.title.trim()
      : "Título desconocido";

  // =====================================
  // AUTORES
  // =====================================

  const autores = Array.isArray(
    item.author_name
  )
    ? item.author_name
        .filter(
          autor => typeof autor === "string"
        )
        .map(
          autor => autor.trim()
        )
        .filter(Boolean)
    : [];

  // =====================================
  // AÑO
  // =====================================

  const anio = Number.isInteger(
    item.first_publish_year
  )
    ? item.first_publish_year
    : null;

  // =====================================
  // PORTADA
  // =====================================

  const idPortada =
    Number.isInteger(item.cover_i) &&
    item.cover_i > 0
      ? item.cover_i
      : null;

  const portada = idPortada !== null
    ? `https://covers.openlibrary.org/b/id/${idPortada}-M.jpg`
    : PORTADA_ALTERNATIVA;

  // =====================================
  // IDENTIFICADOR
  // =====================================

  const claveOficial =
    typeof item.key === "string"
      ? item.key.trim()
      : "";

  const id = claveOficial ||
    crearIdentificadorAlternativo(
      titulo,
      autores,
      anio,
      idPortada
    );

  return {
    id,
    titulo,
    autores,
    anio,
    portada
  };
}

/**
 * Busca libros utilizando Open Library.
 *
 * @param {string} texto - Título o autor.
 * @returns {Promise<Array>} Libros normalizados.
 */
export async function buscarLibros(texto) {

  // =====================================
  // CONSTRUIR URL
  // =====================================

  const url = new URL(URL_BUSQUEDA);

  url.searchParams.set(
    "q",
    texto.trim()
  );

  url.searchParams.set(
    "limit",
    "12"
  );

  // =====================================
  // SOLICITUD ASINCRÓNICA
  // =====================================

  const respuesta = await fetch(
    url.toString()
  );

  // Un HTTP 404 o 500 no rechaza por sí
  // mismo la promesa de fetch.

  if (!respuesta.ok) {
    throw new Error(
      `Error HTTP ${respuesta.status}`
    );
  }

  // =====================================
  // PROCESAR JSON
  // =====================================

  const datos = await respuesta.json();

  if (!Array.isArray(datos.docs)) {
    throw new Error(
      "La API devolvió un formato inesperado."
    );
  }

  // Excluimos solamente entradas que
  // no representan objetos de datos.

  const documentosValidos = datos.docs.filter(
    item =>
      item !== null &&
      typeof item === "object" &&
      !Array.isArray(item)
  );

  // =====================================
  // NORMALIZACIÓN
  // =====================================

  return documentosValidos.map(
    item => normalizarLibro(item)
  );
}
