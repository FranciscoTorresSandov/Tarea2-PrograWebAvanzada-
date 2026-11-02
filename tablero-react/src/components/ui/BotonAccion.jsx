// =========================================
// COMPONENTE: BOTÓN DE ACCIÓN
//
// Recibe una función mediante props.
// Permite reutilizar estilos y comportamiento.
// =========================================

function BotonAccion({
  onAccion,
  children,
  variante = "principal",
  presionado,
  deshabilitado = false,
  ariaLabel
}) {

  return (
    <button
      type="button"
      className={`btn-accion btn-accion--${variante}`}
      onClick={onAccion}
      aria-pressed={presionado}
      aria-label={ariaLabel}
      disabled={deshabilitado}
    >
      {children}
    </button>
  );
}

export default BotonAccion;