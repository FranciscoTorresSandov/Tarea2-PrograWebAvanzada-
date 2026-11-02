// =========================================
// PRUEBAS UNITARIAS — PARTE A
//
// Verifican el estado en memoria
// administrado mediante Map.
// =========================================

import test from "node:test";

import assert from "node:assert/strict";

import {
  obtenerLecturas,
  agregarLectura,
  cambiarEstado,
  eliminarLectura
} from "../js/lecturas.js";

test(
  "Agrega un libro con estado Pendiente",
  () => {

    const libro = {
      id: "prueba-a-001",
      titulo: "Libro de prueba",
      autores: ["Autor de prueba"]
    };

    try {

      const agregado = agregarLectura(libro);

      assert.equal(agregado, true);

      const encontrado = obtenerLecturas().find(
        item => item.id === libro.id
      );

      assert.equal(
        encontrado.estado,
        "Pendiente"
      );

    } finally {

      eliminarLectura(libro.id);

    }
  }
);

test(
  "No permite agregar el mismo libro dos veces",
  () => {

    const libro = {
      id: "prueba-a-002",
      titulo: "Libro duplicado",
      autores: ["Autor"]
    };

    try {

      assert.equal(
        agregarLectura(libro),
        true
      );

      assert.equal(
        agregarLectura(libro),
        false
      );

    } finally {

      eliminarLectura(libro.id);

    }
  }
);

test(
  "Los estados se recorren circularmente",
  () => {

    const libro = {
      id: "prueba-a-003",
      titulo: "Estados",
      autores: ["Autor"]
    };

    try {

      agregarLectura(libro);

      assert.equal(
        cambiarEstado(libro.id),
        "Leyendo"
      );

      assert.equal(
        cambiarEstado(libro.id),
        "Leído"
      );

      assert.equal(
        cambiarEstado(libro.id),
        "Pendiente"
      );

    } finally {

      eliminarLectura(libro.id);

    }
  }
);

test(
  "Eliminar un libro retira su registro",
  () => {

    const libro = {
      id: "prueba-a-004",
      titulo: "Libro eliminado",
      autores: ["Autor"]
    };

    agregarLectura(libro);

    assert.equal(
      eliminarLectura(libro.id),
      true
    );

    assert.equal(
      obtenerLecturas().some(
        item => item.id === libro.id
      ),
      false
    );
  }
);