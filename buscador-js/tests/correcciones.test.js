
// =========================================
// PRUEBAS DE CORRECCIONES FINALES
//
// Verifican:
// - Texto obligatorio.
// - Espacios en blanco.
// - Longitudes útiles.
// - Normalización de Open Library.
// - Identificadores alternativos estables.
// =========================================

import test from "node:test";

import assert from "node:assert/strict";

import {
  obtenerErrorTexto
} from "../js/validacion.js";

import {
  normalizarLibro
} from "../js/api.js";

// =========================================
// VALIDACIÓN DE TEXTO
// =========================================

test(
  "Rechaza una cadena vacía",
  () => {
    assert.equal(
      obtenerErrorTexto("", 2, 150),
      "Este campo es obligatorio."
    );
  }
);

test(
  "Rechaza un texto compuesto solo por espacios",
  () => {
    assert.equal(
      obtenerErrorTexto("       ", 2, 150),
      "Este campo es obligatorio."
    );
  }
);

test(
  "Rechaza espacios y tabulaciones",
  () => {
    assert.equal(
      obtenerErrorTexto(" \t \n ", 2, 150),
      "Este campo es obligatorio."
    );
  }
);

test(
  "Comprueba la longitud después de trim",
  () => {
    const resultado = obtenerErrorTexto(
      "     A     ",
      2,
      150
    );

    assert.match(
      resultado,
      /al menos 2 caracteres/
    );
  }
);

test(
  "Acepta un texto válido",
  () => {
    assert.equal(
      obtenerErrorTexto(
        "El principito",
        2,
        150
      ),
      ""
    );
  }
);

test(
  "Rechaza un texto superior al máximo",
  () => {
    const resultado = obtenerErrorTexto(
      "Un texto demasiado largo",
      2,
      10
    );

    assert.match(
      resultado,
      /como máximo 10 caracteres/
    );
  }
);

// =========================================
// NORMALIZACIÓN DE OPEN LIBRARY
// =========================================

test(
  "Conserva la clave oficial de Open Library",
  () => {

    const libro = normalizarLibro({
      key: "/works/OL123W",
      title: "Libro de prueba",
      author_name: ["Autor"],
      first_publish_year: 2000
    });

    assert.equal(
      libro.id,
      "/works/OL123W"
    );
  }
);

test(
  "Genera un ID estable sin clave oficial",
  () => {

    const documento = {
      title: "Libro sin clave",
      author_name: ["Autor A"],
      first_publish_year: 1995,
      cover_i: 12345
    };

    const primero = normalizarLibro(
      documento
    );

    const segundo = normalizarLibro(
      { ...documento }
    );

    assert.equal(
      primero.id,
      segundo.id
    );

    assert.match(
      primero.id,
      /^sin-clave:/
    );
  }
);

test(
  "Distingue libros con diferentes metadatos",
  () => {

    const primero = normalizarLibro({
      title: "Libro A",
      author_name: ["Autor"],
      first_publish_year: 2000
    });

    const segundo = normalizarLibro({
      title: "Libro B",
      author_name: ["Autor"],
      first_publish_year: 2000
    });

    assert.notEqual(
      primero.id,
      segundo.id
    );
  }
);

test(
  "Normaliza correctamente campos ausentes",
  () => {

    const libro = normalizarLibro({
      key: "/works/OL999W",
      title: "Sin información adicional"
    });

    assert.deepEqual(
      libro.autores,
      []
    );

    assert.equal(
      libro.anio,
      null
    );

    assert.equal(
      libro.portada,
      "/portada-alternativa.svg"
    );
  }
);

test(
  "Rechaza documentos que no son objetos válidos",
  () => {

    assert.throws(
      () => normalizarLibro(null),
      TypeError
    );

    assert.throws(
      () => normalizarLibro([]),
      TypeError
    );
  }
);
