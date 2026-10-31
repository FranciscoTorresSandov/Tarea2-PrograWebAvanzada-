// =========================================
// COMPONENTE: CABECERA
// Responsabilidad:
// Mostrar la identidad visual del club.
// =========================================

function Cabecera() {
  return (
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
  );
}

export default Cabecera;