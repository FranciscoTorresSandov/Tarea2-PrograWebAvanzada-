// =========================================
// COMPONENTE PRINCIPAL — APP
// =========================================

import {
  librosIniciales,
  miembrosIniciales
} from "./data/datosIniciales.js";

import "./App.css";

/**
 * Devuelve el nombre de un miembro a partir
 * de su identificador.
 */
function obtenerNombreMiembro(miembroId) {
  const miembro = miembrosIniciales.find(
    item => item.id === miembroId
  );

  return miembro?.nombre ?? "Miembro desconocido";
}

/**
 * Selecciona la clase visual correspondiente
 * a cada estado de lectura.
 */
function obtenerClaseEstado(estado) {
  const clases = {
    Pendiente: "estado-pendiente",
    Leyendo: "estado-leyendo",
    "Leído": "estado-leido"
  };

  return clases[estado] ?? "";
}

/**
 * Componente principal de la aplicación.
 */
function App() {
  return (
    <div className="aplicacion">

      <header className="encabezado-react">

        <div className="contenedor">

          <p className="etiqueta">
            Club de lectura comunitario
          </p>

          <h1>Estantería Común</h1>

          <p>
            Tablero interno de lecturas
            desarrollado con React.
          </p>

        </div>

      </header>

      <main className="contenedor contenido-principal">

        <section
          className="panel-club"
          aria-labelledby="titulo-libros"
        >

          <h2 id="titulo-libros">
            Lecturas del club
          </h2>

          <p>
            Consulta los libros registrados,
            su estado y el miembro que los propuso.
          </p>

          <div className="lista-libros-react">

            {librosIniciales.map(libro => (

              <article
                key={libro.id}
                className="libro-card"
              >

                <h3>{libro.titulo}</h3>

                <p>
                  <strong>Autor:</strong>{" "}
                  {libro.autor}
                </p>

                <p>
                  <strong>Año:</strong>{" "}
                  {libro.anio}
                </p>

                <p>
                  <strong>Propuesto por:</strong>{" "}
                  {obtenerNombreMiembro(
                    libro.miembroId
                  )}
                </p>

                <span
                  className={
                    `etiqueta-estado ${
                      obtenerClaseEstado(libro.estado)
                    }`
                  }
                >
                  {libro.estado}
                </span>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;