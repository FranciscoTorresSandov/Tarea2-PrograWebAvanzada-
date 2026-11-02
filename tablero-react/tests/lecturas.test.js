// =========================================
// PRUEBAS UNITARIAS — LECTURAS REACT
//
// Se comprueban las funciones puras
// utilizadas para administrar el estado.
// =========================================

import test from "node:test";

import assert from "node:assert/strict";

import {
  siguienteEstado,
  actualizarEstadoLectura,
  quitarLibro,
  agregarLibro,
  filtrarLibros,
  resumirEstados
} from "../src/utils/lecturas.js";

// Datos controlados para las pruebas.

const librosPrueba = [
  {
    id: "1",
    titulo: "Libro A",
    estado: "Pendiente",
    miembroId: "m1"
  },
  {
    id: "2",
    titulo: "Libro B",
    estado: "Leyendo",
    miembroId: "m2"
  },
  {
    id: "3",
    titulo: "Libro C",
    estado: "Leído",
    miembroId: "m1"
  }
];

// =========================================
// ESTADOS DE LECTURA
// =========================================

test(
  "Pendiente cambia a Leyendo",
  () => {
    assert.equal(
      siguienteEstado("Pendiente"),
      "Leyendo"
    );
  }
);

test(
  "Leyendo cambia a Leído",
  () => {
    assert.equal(
      siguienteEstado("Leyendo"),
      "Leído"
    );
  }
);

test(
  "Leído vuelve a Pendiente",
  () => {
    assert.equal(
      siguienteEstado("Leído"),
      "Pendiente"
    );
  }
);

test(
  "Un estado desconocido produce un error",
  () => {
    assert.throws(
      () => siguienteEstado("Inexistente"),
      /Estado de lectura inválido/
    );
  }
);

// =========================================
// ACTUALIZACIÓN INMUTABLE
// =========================================

test(
  "Cambiar estado no modifica el arreglo original",
  () => {

    const resultado = actualizarEstadoLectura(
      librosPrueba,
      "1"
    );

    assert.equal(
      librosPrueba[0].estado,
      "Pendiente"
    );

    assert.equal(
      resultado[0].estado,
      "Leyendo"
    );

    assert.notStrictEqual(
      resultado,
      librosPrueba
    );

    assert.notStrictEqual(
      resultado[0],
      librosPrueba[0]
    );
  }
);

// =========================================
// ELIMINACIÓN
// =========================================

test(
  "Quitar un libro conserva los demás",
  () => {

    const resultado = quitarLibro(
      librosPrueba,
      "2"
    );

    assert.equal(resultado.length, 2);

    assert.equal(
      resultado.some(libro => libro.id === "2"),
      false
    );

    assert.equal(librosPrueba.length, 3);
  }
);

// =========================================
// AGREGAR LIBRO
// =========================================

test(
  "Agregar libro crea una lista nueva",
  () => {

    const nuevo = {
      id: "4",
      titulo: "Libro D",
      estado: "Pendiente",
      miembroId: "m2"
    };

    const resultado = agregarLibro(
      librosPrueba,
      nuevo
    );

    assert.equal(resultado.length, 4);

    assert.equal(librosPrueba.length, 3);

    assert.notStrictEqual(
      resultado,
      librosPrueba
    );
  }
);

test(
  "No se permite duplicar identificadores",
  () => {

    assert.throws(
      () => agregarLibro(
        librosPrueba,
        {
          id: "1",
          titulo: "Duplicado"
        }
      ),
      /identificador/
    );
  }
);

// =========================================
// FILTROS
// =========================================

test(
  "Filtrar por estado devuelve los correctos",
  () => {

    const resultado = filtrarLibros(
      librosPrueba,
      "Pendiente",
      "Todos"
    );

    assert.equal(resultado.length, 1);

    assert.equal(resultado[0].id, "1");
  }
);

test(
  "Filtrar simultáneamente estado y miembro",
  () => {

    const resultado = filtrarLibros(
      librosPrueba,
      "Leído",
      "m1"
    );

    assert.equal(resultado.length, 1);

    assert.equal(resultado[0].id, "3");
  }
);

test(
  "Una combinación sin coincidencias devuelve vacío",
  () => {

    const resultado = filtrarLibros(
      librosPrueba,
      "Leído",
      "m2"
    );

    assert.deepEqual(resultado, []);
  }
);

// =========================================
// RESUMEN
// =========================================

test(
  "Resumen cuenta correctamente los estados",
  () => {

    const resumen = resumirEstados(
      librosPrueba
    );

    assert.deepEqual(
      resumen,
      {
        Pendiente: 1,
        Leyendo: 1,
        "Leído": 1
      }
    );
  }
);

test(
  "Resumen vacío conserva las tres categorías",
  () => {

    assert.deepEqual(
      resumirEstados([]),
      {
        Pendiente: 0,
        Leyendo: 0,
        "Leído": 0
      }
    );
  }
);