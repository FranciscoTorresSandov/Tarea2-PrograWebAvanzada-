// =========================================
// COMPONENTE: BOTÓN DE ACCIÓN
// Responsabilidad:
// Presentar un botón reutilizable y ejecutar
// una función recibida del componente padre.
// =========================================

function BotonAccion({
  onAccion,
  children,
  presionado = false
}) {

  return (
    <button
      type="button"
      className="btn-accion"
      onClick={onAccion}
      aria-pressed={presionado}
    >
      {children}
    </button>
  );
}

export default BotonAccion;