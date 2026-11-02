// =========================================
// COMPONENTE: RESUMEN
//
// Responsabilidad:
// Mostrar cantidades derivadas de los libros.
//
// No utiliza useState.
// =========================================

import {
  ESTADOS_LECTURA,
  resumirEstados
} from "../../utils/lecturas.js";

import "./Resumen.css";

function Resumen({ libros }) {

  // Cálculo derivado de las props actuales.

  const conteos = resumirEstados(libros);

  return (
    <section
      className="resumen-panel"
      aria-labelledby="titulo-resumen"
    >

      <h3 id="titulo-resumen">
        Resumen de lecturas
      </h3>

      <p className="resumen-total">
        Total mostrado:{" "}
        <strong>{libros.length}</strong>
      </p>

      <ul
        className="resumen-lista"
        aria-live="polite"
      >

        {ESTADOS_LECTURA.map(estado => (

          <li key={estado}>

            <span>{estado}</span>

            <strong>
              {conteos[estado]}
            </strong>

          </li>

        ))}

      </ul>

    </section>
  );
}

export default Resumen;