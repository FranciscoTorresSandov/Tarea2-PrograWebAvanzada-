// =========================================
// PRUEBAS UNITARIAS — FORMULARIO REACT
// =========================================

import test from "node:test";

import assert from "node:assert/strict";

import {
  validarDatosLibro,
  crearLibroDesdeFormulario
} from "../src/utils/validacionLibro.js";

const miembros = [
  {
    id: "m1",
    nombre: "Ana"
  },
  {
    id: "m2",
    nombre: "Carlos"
  }
];

const datosValidos = {
  titulo: "El principito",
  autor: "Antoine de Saint-Exupéry",
  anio: "1943",
  miembroId: "m1"
};

// =========================================
// CAMPOS OBLIGATORIOS
// =========================================

test(
  "Rechaza todos los campos vacíos",
  () => {

    const errores = validarDatosLibro(
      {
        titulo: "",
        autor: "",
        anio: "",
        miembroId: ""
      },
      miembros
    );

    assert.ok(errores.titulo);
    assert.ok(errores.autor);
    assert.ok(errores.anio);
    assert.ok(errores.miembroId);
  }
);

// =========================================
// TÍTULO
// =========================================

test(
  "Rechaza títulos demasiado cortos",
  () => {

    const errores = validarDatosLibro(
      {
        ...datosValidos,
        titulo: "A"
      },
      miembros
    );

    assert.ok(errores.titulo);
  }
);

// =========================================
// AÑO
// =========================================

test(
  "Rechaza años futuros",
  () => {

    const anioFuturo = String(
      new Date().getFullYear() + 1
    );

    const errores = validarDatosLibro(
      {
        ...datosValidos,
        anio: anioFuturo
      },
      miembros
    );

    assert.ok(errores.anio);
  }
);

test(
  "Rechaza un año decimal",
  () => {

    const errores = validarDatosLibro(
      {
        ...datosValidos,
        anio: "2000.5"
      },
      miembros
    );

    assert.ok(errores.anio);
  }
);

test(
  "Rechaza el año cero",
  () => {

    const errores = validarDatosLibro(
      {
        ...datosValidos,
        anio: "0"
      },
      miembros
    );

    assert.ok(errores.anio);
  }
);

// =========================================
// MIEMBRO
// =========================================

test(
  "Rechaza miembros inexistentes",
  () => {

    const errores = validarDatosLibro(
      {
        ...datosValidos,
        miembroId: "m-inexistente"
      },
      miembros
    );

    assert.ok(errores.miembroId);
  }
);

// =========================================
// DATOS VÁLIDOS
// =========================================

test(
  "Acepta una propuesta correcta",
  () => {

    const errores = validarDatosLibro(
      datosValidos,
      miembros
    );

    assert.deepEqual(errores, {});
  }
);

// =========================================
// NORMALIZACIÓN
// =========================================

test(
  "Construye correctamente el libro nuevo",
  () => {

    const libro = crearLibroDesdeFormulario(
      datosValidos,
      "nuevo-001"
    );

    assert.equal(
      libro.id,
      "nuevo-001"
    );

    assert.equal(
      libro.titulo,
      "El principito"
    );

    assert.equal(
      libro.anio,
      1943
    );

    assert.equal(
      libro.estado,
      "Pendiente"
    );

    assert.equal(
      libro.miembroId,
      "m1"
    );
  }
);