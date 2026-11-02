// =========================================
// ESTANTERÍA COMÚN — PARTE B
// COMPONENTE PRINCIPAL: APP
//
// Responsabilidades:
// - Mantener el estado de las lecturas.
// - Coordinar filtros y resumen.
// - Administrar las interacciones del tablero.
// - Incorporar libros desde el formulario.
// - Derivar información sin duplicar estado.
// =========================================

import { useState } from "react";

import {
  librosIniciales,
  miembrosIniciales
} from "./data/datosIniciales.js";

import {
  actualizarEstadoLectura,
  quitarLibro,
  agregarLibro,
  filtrarLibros
} from "./utils/lecturas.js";

import {
  crearLibroDesdeFormulario
} from "./utils/validacionLibro.js";

// Componentes de estructura.

import Cabecera from "./components/layout/Cabecera.jsx";

import Panel from "./components/layout/Panel.jsx";

// Componentes de libros.

import ListaLibros from "./components/libros/ListaLibros.jsx";

// Componentes hermanos.

import Filtros from "./components/lecturas/Filtros.jsx";

import Resumen from "./components/lecturas/Resumen.jsx";

// Formulario controlado.

import FormularioLibro from "./components/formularios/FormularioLibro.jsx";

import "./App.css";

function App() {

  // =====================================
  // ESTADO PRINCIPAL
  // =====================================

  const [libros, setLibros] = useState(
    () => librosIniciales.map(libro => ({
      ...libro
    }))
  );

  // =====================================
  // ESTADO DE SELECCIÓN
  // =====================================

  const [
    seleccionadoId,
    setSeleccionadoId
  ] = useState(null);

  // =====================================
  // FILTROS ELEVADOS
  // =====================================

  const [
    filtroEstado,
    setFiltroEstado
  ] = useState("Todos");

  const [
    filtroMiembro,
    setFiltroMiembro
  ] = useState("Todos");

  // =====================================
  // DATOS DERIVADOS
  // =====================================

  // La lista visible se obtiene directamente
  // del estado y los filtros actuales.

  const librosVisibles = filtrarLibros(
    libros,
    filtroEstado,
    filtroMiembro
  );

  // La selección también se deriva.
  // No almacenamos otra copia del libro.

  const libroSeleccionado = libros.find(
    libro => libro.id === seleccionadoId
  );

  const mensajeVacio =
    libros.length === 0
      ? "Todavía no hay libros registrados."
      : "No hay libros que coincidan con los filtros seleccionados.";

  // =====================================
  // SELECCIONAR LIBRO
  // =====================================

  function seleccionarLibro(id) {

    setSeleccionadoId(
      anterior => anterior === id ? null : id
    );

  }

  // =====================================
  // CAMBIAR ESTADO
  // =====================================

  function cambiarEstadoLibro(id) {

    setLibros(
      anteriores => actualizarEstadoLectura(
        anteriores,
        id
      )
    );

  }

  // =====================================
  // QUITAR LIBRO
  // =====================================

  function eliminarLibro(id) {

    setLibros(
      anteriores => quitarLibro(
        anteriores,
        id
      )
    );

    // Limpiamos la selección si corresponde.

    setSeleccionadoId(
      anterior => anterior === id ? null : anterior
    );

  }

  // =====================================
  // AGREGAR LIBRO
  // =====================================

  function agregarNuevoLibro(datos) {

    // Cada nuevo libro recibe un identificador
    // único que no depende del índice del arreglo.

    const id = `libro-${crypto.randomUUID()}`;

    const nuevoLibro = crearLibroDesdeFormulario(
      datos,
      id
    );

    // La colección se actualiza sin mutación.

    setLibros(
      anteriores => agregarLibro(
        anteriores,
        nuevoLibro
      )
    );

    // Restablecemos los filtros para garantizar
    // que el libro recién agregado sea visible.

    setFiltroEstado("Todos");
    setFiltroMiembro("Todos");

    // Seleccionamos el nuevo libro.

    setSeleccionadoId(nuevoLibro.id);
  }

  // =====================================
  // INTERFAZ
  // =====================================

  return (
    <div className="aplicacion">

      <Cabecera />

      <main className="contenedor contenido-principal">

        {/* ============================== */}
        {/* LISTA Y ANÁLISIS DE LECTURAS   */}
        {/* ============================== */}

        <Panel
          titulo="Lecturas del club"
          idTitulo="titulo-lecturas"
        >

          <p>
            Consulta, filtra y administra
            las lecturas del club.
          </p>

          {/* Filtros y Resumen son hermanos.
              Comparten datos desde App. */}

          <div className="dashboard-analisis">

            <Filtros
              miembros={miembrosIniciales}
              filtroEstado={filtroEstado}
              filtroMiembro={filtroMiembro}
              onCambiarEstado={setFiltroEstado}
              onCambiarMiembro={setFiltroMiembro}
            />

            <Resumen
              libros={librosVisibles}
            />

          </div>

          <ListaLibros
            libros={librosVisibles}
            miembros={miembrosIniciales}
            seleccionadoId={seleccionadoId}
            onSeleccionar={seleccionarLibro}
            onCambiarEstado={cambiarEstadoLibro}
            onQuitar={eliminarLibro}
            mensajeVacio={mensajeVacio}
          />

        </Panel>

        {/* ============================== */}
        {/* DETALLE DEL LIBRO SELECCIONADO */}
        {/* ============================== */}

        <Panel
          titulo="Selección actual"
          idTitulo="titulo-seleccion"
        >

          {libroSeleccionado ? (

            <div className="detalle-seleccionado">

              <p>Has seleccionado:</p>

              <h3>
                {libroSeleccionado.titulo}
              </h3>

              <p>
                Estado actual:{" "}
                <strong>
                  {libroSeleccionado.estado}
                </strong>
              </p>

            </div>

          ) : (

            <p className="mensaje-vacio">
              Selecciona un libro para consultar
              su información en este panel.
            </p>

          )}

        </Panel>

        {/* ============================== */}
        {/* FORMULARIO CONTROLADO          */}
        {/* ============================== */}

        <Panel
          titulo="Agregar un libro"
          idTitulo="titulo-agregar"
        >

          <p>
            Registra un libro para el club.
            Todos los campos son obligatorios.
          </p>

          <FormularioLibro
            miembros={miembrosIniciales}
            onAgregar={agregarNuevoLibro}
          />

        </Panel>

      </main>

    </div>
  );
}

export default App;