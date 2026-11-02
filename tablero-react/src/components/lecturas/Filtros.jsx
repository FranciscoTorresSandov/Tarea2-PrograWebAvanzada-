// =========================================
// COMPONENTE: FILTROS
//
// Responsabilidad:
// Recibir filtros y callbacks desde App.
// No almacena una copia de los filtros.
// =========================================

import {
  ESTADOS_LECTURA
} from "../../utils/lecturas.js";

import "./Filtros.css";

function Filtros({
  miembros,
  filtroEstado,
  filtroMiembro,
  onCambiarEstado,
  onCambiarMiembro
}) {

  return (
    <section
      className="filtros-panel"
      aria-labelledby="titulo-filtros"
    >

      <h3 id="titulo-filtros">
        Filtros de lectura
      </h3>

      <div className="filtros-contenido">

        <div className="campo-filtro">

          <label htmlFor="filtro-estado">
            Estado del libro
          </label>

          <select
            id="filtro-estado"
            value={filtroEstado}
            onChange={evento =>
              onCambiarEstado(evento.target.value)
            }
          >

            <option value="Todos">
              Todos los estados
            </option>

            {ESTADOS_LECTURA.map(estado => (
              <option
                key={estado}
                value={estado}
              >
                {estado}
              </option>
            ))}

          </select>

        </div>

        <div className="campo-filtro">

          <label htmlFor="filtro-miembro">
            Miembro del club
          </label>

          <select
            id="filtro-miembro"
            value={filtroMiembro}
            onChange={evento =>
              onCambiarMiembro(evento.target.value)
            }
          >

            <option value="Todos">
              Todos los miembros
            </option>

            {miembros.map(miembro => (
              <option
                key={miembro.id}
                value={miembro.id}
              >
                {miembro.nombre}
              </option>
            ))}

          </select>

        </div>

      </div>

    </section>
  );
}

export default Filtros;