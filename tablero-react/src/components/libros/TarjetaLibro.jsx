// =========================================
// COMPONENTE: TARJETA DE LIBRO
// Responsabilidad:
// Mostrar los datos de una lectura individual.
// =========================================

import BotonAccion from "../ui/BotonAccion.jsx";

/**
 * Devuelve la clase correspondiente al estado.
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
 * Presenta la información del libro.
 *
 * Recibe datos y una función desde el padre.
 */
function TarjetaLibro({
  libro,
  propuestoPor,
  onSeleccionar,
  estaSeleccionado
}) {

  return (
    <article
      className={
        estaSeleccionado
          ? "libro-card seleccionada"
          : "libro-card"
      }
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
        {propuestoPor}
      </p>

      <p>
        <span
          className={
            `etiqueta-estado ${
              obtenerClaseEstado(libro.estado)
            }`
          }
        >
          {libro.estado}
        </span>
      </p>

      <BotonAccion
        onAccion={() => onSeleccionar(libro.id)}
        presionado={estaSeleccionado}
      >
        {estaSeleccionado
          ? "Ocultar selección"
          : "Seleccionar libro"}
      </BotonAccion>

    </article>
  );
}

export default TarjetaLibro;