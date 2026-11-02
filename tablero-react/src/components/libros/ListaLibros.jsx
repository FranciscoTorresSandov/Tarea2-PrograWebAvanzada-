// =========================================
// COMPONENTE: LISTA DE LIBROS
//
// Responsabilidad:
// Renderizar la colección recibida
// mediante tarjetas y keys estables.
// =========================================

import TarjetaLibro from "./TarjetaLibro.jsx";

function obtenerNombreMiembro(
  miembros,
  miembroId
) {
  const miembro = miembros.find(
    item => item.id === miembroId
  );

  return miembro?.nombre ?? "Miembro desconocido";
}

function ListaLibros({
  libros,
  miembros,
  seleccionadoId,
  onSeleccionar,
  onCambiarEstado,
  onQuitar,
  mensajeVacio = "Todavía no hay libros registrados."
}) {

  if (libros.length === 0) {
    return (
      <p className="mensaje-vacio" role="status">
        {mensajeVacio}
      </p>
    );
  }

  return (
    <div className="lista-libros-react">

      {libros.map(libro => (

        <TarjetaLibro
          key={libro.id}
          libro={libro}
          propuestoPor={
            obtenerNombreMiembro(
              miembros,
              libro.miembroId
            )
          }
          seleccionadoId={seleccionadoId}
          estaSeleccionado={
            seleccionadoId === libro.id
          }
          onSeleccionar={onSeleccionar}
          onCambiarEstado={onCambiarEstado}
          onQuitar={onQuitar}
        />

      ))}

    </div>
  );
}

export default ListaLibros;