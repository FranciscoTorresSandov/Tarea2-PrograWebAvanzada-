// =========================================
// COMPONENTE PRINCIPAL — APP
//
// Responsabilidades:
// - Mantener el estado de libros.
// - Mantener el estado compartido de filtros.
// - Coordinar componentes hermanos.
// - Derivar la lista visible desde el estado.
// =========================================

import { useState } from "react";

import {
  librosIniciales,
  miembrosIniciales
} from "./data/datosIniciales.js";

import {
  actualizarEstadoLectura,
  quitarLibro,
  filtrarLibros
} from "./utils/lecturas.js";

import Cabecera from "./components/layout/Cabecera.jsx";

import Panel from "./components/layout/Panel.jsx";

import ListaLibros from "./components/libros/ListaLibros.jsx";

import Filtros from "./components/lecturas/Filtros.jsx";

import Resumen from "./components/lecturas/Resumen.jsx";

import "./App.css";

function App() {

  // =====================================
  // ESTADO PRINCIPAL DE LECTURAS
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
  // ESTADO ELEVADO DE LOS FILTROS
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
  // VALORES DERIVADOS
  // =====================================

  // No guardamos esta lista en useState.
  // Se calcula desde libros y ambos filtros.

  const librosVisibles = filtrarLibros(
    libros,
    filtroEstado,
    filtroMiembro
  );

  // El libro seleccionado también se deriva.

  const libroSeleccionado = libros.find(
    libro => libro.id === seleccionadoId
  );

  const mensajeVacio =
    libros.length === 0
      ? "Todavía no hay libros registrados."
      : "No hay libros que coincidan con los filtros seleccionados.";

  // =====================================
  // CONTROLADORES DE INTERACCIÓN
  // =====================================

  function seleccionarLibro(id) {
    setSeleccionadoId(
      anterior => anterior === id ? null : id
    );
  }

  function cambiarEstadoLibro(id) {
    setLibros(
      anteriores => actualizarEstadoLectura(
        anteriores,
        id
      )
    );
  }

  function eliminarLibro(id) {
    setLibros(
      anteriores => quitarLibro(
        anteriores,
        id
      )
    );

    setSeleccionadoId(
      anterior => anterior === id ? null : anterior
    );
  }

  // =====================================
  // RENDERIZADO
  // =====================================

  return (
    <div className="aplicacion">

      <Cabecera />

      <main className="contenedor contenido-principal">

        <Panel
          titulo="Lecturas del club"
          idTitulo="titulo-lecturas"
        >

          <p>
            Filtra los libros por estado o miembro.
            Los resultados y el resumen se
            actualizan automáticamente.
          </p>

          {/* Componentes hermanos.
              Su estado compartido reside en App. */}

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

      </main>

    </div>
  );
}

export default App;