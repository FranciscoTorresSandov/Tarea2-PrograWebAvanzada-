// =========================================
// COMPONENTE PRINCIPAL — APP
//
// Responsabilidades:
// - Mantener la lista de libros en estado.
// - Mantener la selección actual.
// - Coordinar acciones entre componentes.
// =========================================

import { useState } from "react";

import {
  librosIniciales,
  miembrosIniciales
} from "./data/datosIniciales.js";

import {
  actualizarEstadoLectura,
  quitarLibro
} from "./utils/lecturas.js";

import Cabecera from "./components/layout/Cabecera.jsx";

import Panel from "./components/layout/Panel.jsx";

import ListaLibros from "./components/libros/ListaLibros.jsx";

import "./App.css";

function App() {

  // El arreglo inicial se copia.
  // No modificaremos sus objetos originales.

  const [libros, setLibros] = useState(
    () => librosIniciales.map(libro => ({
      ...libro
    }))
  );

  const [
    seleccionadoId,
    setSeleccionadoId
  ] = useState(null);

  /**
   * Selecciona o deselecciona un libro.
   */
  function seleccionarLibro(id) {
    setSeleccionadoId(
      anterior => anterior === id ? null : id
    );
  }

  /**
   * Cambia el estado del libro solicitado.
   *
   * La actualización funcional utiliza
   * el estado anterior más reciente.
   */
  function cambiarEstadoLibro(id) {
    setLibros(
      anteriores => actualizarEstadoLectura(
        anteriores,
        id
      )
    );
  }

  /**
   * Elimina un libro de forma inmutable.
   */
  function eliminarLibro(id) {
    setLibros(
      anteriores => quitarLibro(anteriores, id)
    );

    // Si eliminamos el libro seleccionado,
    // también limpiamos su selección.

    setSeleccionadoId(
      anterior => anterior === id ? null : anterior
    );
  }

  // Dato derivado del estado actual.
  // No se guarda en otro useState.

  const libroSeleccionado = libros.find(
    libro => libro.id === seleccionadoId
  );

  return (
    <div className="aplicacion">

      <Cabecera />

      <main className="contenedor contenido-principal">

        <Panel
          titulo="Lecturas del club"
          idTitulo="titulo-lecturas"
        >

          <p>
            Consulta los libros registrados,
            cambia su estado o elimínalos.
          </p>

          <ListaLibros
            libros={libros}
            miembros={miembrosIniciales}
            seleccionadoId={seleccionadoId}
            onSeleccionar={seleccionarLibro}
            onCambiarEstado={cambiarEstadoLibro}
            onQuitar={eliminarLibro}
          />

        </Panel>

        <Panel
          titulo="Selección actual"
          idTitulo="titulo-seleccion"
        >

          {libroSeleccionado ? (

            <div className="detalle-seleccionado">

              <p>Has seleccionado:</p>

              <h3>{libroSeleccionado.titulo}</h3>

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