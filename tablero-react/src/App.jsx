// =========================================
// COMPONENTE PRINCIPAL — APP
//
// Responsabilidades:
// - Coordinar los componentes.
// - Mantener la selección actual.
// - Proporcionar datos y callbacks.
// =========================================

import { useState } from "react";

import {
  librosIniciales,
  miembrosIniciales
} from "./data/datosIniciales.js";

import Cabecera from "./components/layout/Cabecera.jsx";

import Panel from "./components/layout/Panel.jsx";

import ListaLibros from "./components/libros/ListaLibros.jsx";

import "./App.css";

function App() {

  // Estado que identifica al libro seleccionado.
  //
  // null significa que no existe una selección.

  const [
    seleccionadoId,
    setSeleccionadoId
  ] = useState(null);

  /**
   * Selecciona un libro.
   *
   * Si presionamos el libro seleccionado
   * nuevamente, eliminamos la selección.
   */
  function seleccionarLibro(id) {
    setSeleccionadoId(
      anterior => anterior === id ? null : id
    );
  }

  /**
   * Derivamos el libro seleccionado.
   *
   * No necesitamos guardar el objeto completo
   * en otro estado.
   */
  const libroSeleccionado = librosIniciales.find(
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
            su estado y el miembro que los propuso.
          </p>

          <ListaLibros
            libros={librosIniciales}
            miembros={miembrosIniciales}
            seleccionadoId={seleccionadoId}
            onSeleccionar={seleccionarLibro}
          />

        </Panel>

        <Panel
          titulo="Selección actual"
          idTitulo="titulo-seleccion"
        >

          {libroSeleccionado ? (

            <div className="detalle-seleccionado">

              <p>
                Has seleccionado:
              </p>

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