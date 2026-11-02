// =========================================
// COMPONENTE: TARJETA DE LIBRO
//
// Responsabilidad:
// Mostrar un libro y comunicar acciones
// mediante callbacks recibidos del padre.
// =========================================

import BotonAccion from "../ui/BotonAccion.jsx";

function obtenerClaseEstado(estado) {
  const clases = {
    Pendiente: "estado-pendiente",
    Leyendo: "estado-leyendo",
    "Leído": "estado-leido"
  };

  return clases[estado] ?? "";
}

function TarjetaLibro({
  libro,
  propuestoPor,
  onSeleccionar,
  onCambiarEstado,
  onQuitar,
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

      <div className="botones-libro">

        <BotonAccion
          variante="secundario"
          onAccion={() => onSeleccionar(libro.id)}
          presionado={estaSeleccionado}
        >
          {estaSeleccionado
            ? "Ocultar selección"
            : "Seleccionar"}
        </BotonAccion>

        <BotonAccion
          onAccion={() => onCambiarEstado(libro.id)}
          ariaLabel={`Cambiar estado de ${libro.titulo}`}
        >
          Cambiar estado
        </BotonAccion>

        <BotonAccion
          variante="peligro"
          onAccion={() => onQuitar(libro.id)}
          ariaLabel={`Quitar ${libro.titulo}`}
        >
          Quitar
        </BotonAccion>

      </div>

    </article>
  );
}

export default TarjetaLibro;