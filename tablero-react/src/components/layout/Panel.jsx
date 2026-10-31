// =========================================
// COMPONENTE: PANEL
// Responsabilidad:
// Proporcionar una estructura reutilizable
// para diferentes secciones del tablero.
// =========================================

function Panel({
  titulo,
  idTitulo,
  children
}) {

  return (
    <section
      className="panel-club"
      aria-labelledby={idTitulo}
    >

      <h2 id={idTitulo}>
        {titulo}
      </h2>

      {children}

    </section>
  );
}

export default Panel;