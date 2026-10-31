// =========================================
// COMPONENTE: LISTA DE LIBROS
// Responsabilidades:
// - Recorrer el arreglo de libros.
// - Resolver el miembro que propuso cada uno.
// - Renderizar tarjetas con keys estables.
// =========================================

import TarjetaLibro from "./TarjetaLibro.jsx";

/**
 * Busca el nombre del miembro proponente.
 */
function obtenerNombreMiembro(
  miembros,
  miembroId
) {

  const miembro = miembros.find(
    item => item.id === miembroId
  );

  return miembro?.nombre ?? "Miembro desconocido";
}

/**
 * Renderiza los libros recibidos.
 */
function ListaLibros({
  libros,
  miembros,
  seleccionadoId,
  onSeleccionar
}) {

  if (libros.length === 0) {
    return (
      <p className="mensaje-vacio">
        Todavía no hay libros registrados.
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
          onSeleccionar={onSeleccionar}
          estaSeleccionado={
            seleccionadoId === libro.id
          }
        />

      ))}

    </div>
  );
}

export default ListaLibros;