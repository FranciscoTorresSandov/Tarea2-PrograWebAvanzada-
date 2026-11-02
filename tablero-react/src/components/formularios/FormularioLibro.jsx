// =========================================
// COMPONENTE: FORMULARIO DE LIBRO
//
// Responsabilidades:
// - Administrar campos controlados.
// - Validar entradas.
// - Mostrar errores por campo.
// - Comunicar al padre una nueva lectura.
// =========================================

import { useState } from "react";

import {
  validarDatosLibro
} from "../../utils/validacionLibro.js";

import "./FormularioLibro.css";

// Datos iniciales del formulario.
// Cada nueva apertura del formulario comienza
// con estos valores vacíos.

const VALORES_INICIALES = {
  titulo: "",
  autor: "",
  anio: "",
  miembroId: ""
};

function FormularioLibro({
  miembros,
  onAgregar
}) {

  // =====================================
  // ESTADO DE LOS CAMPOS
  // =====================================

  const [valores, setValores] = useState(
    { ...VALORES_INICIALES }
  );

  // Indica qué controles fueron visitados.

  const [tocados, setTocados] = useState({});

  // Indica si se intentó enviar el formulario.

  const [
    intentoEnvio,
    setIntentoEnvio
  ] = useState(false);

  // Mensaje de operación satisfactoria.

  const [
    mensajeExito,
    setMensajeExito
  ] = useState("");

  // =====================================
  // ERRORES DERIVADOS
  // =====================================

  const errores = validarDatosLibro(
    valores,
    miembros
  );

  /**
   * Solo muestra el error cuando:
   * - El campo ha sido visitado; o
   * - El usuario intentó enviar el formulario.
   */
  function errorVisible(nombre) {
    if (
      tocados[nombre] ||
      intentoEnvio
    ) {
      return errores[nombre] ?? "";
    }

    return "";
  }

  // =====================================
  // ACTUALIZAR CAMPOS CONTROLADOS
  // =====================================

  function manejarCambio(evento) {

    const {
      name,
      value
    } = evento.target;

    setValores(anteriores => ({
      ...anteriores,
      [name]: value
    }));

    setMensajeExito("");
  }

  /**
   * Registra que el usuario interactuó
   * con un campo y después lo abandonó.
   */
  function manejarSalida(evento) {
    const nombre = evento.target.name;

    setTocados(anteriores => ({
      ...anteriores,
      [nombre]: true
    }));
  }

  // =====================================
  // ENVÍO DEL FORMULARIO
  // =====================================

  function manejarEnvio(evento) {
    evento.preventDefault();

    setIntentoEnvio(true);
    setMensajeExito("");

    // Los errores proceden directamente
    // de los valores controlados.

    const hayErrores =
      Object.keys(errores).length > 0;

    if (hayErrores) {
      return;
    }

    // Comunicamos los datos válidos al padre.
    onAgregar(valores);

    // Reiniciamos los valores y los mensajes.

    setValores({
      ...VALORES_INICIALES
    });

    setTocados({});
    setIntentoEnvio(false);

    setMensajeExito(
      "El libro se agregó correctamente al tablero."
    );
  }

  // =====================================
  // RENDERIZADO
  // =====================================

  const errorTitulo = errorVisible("titulo");
  const errorAutor = errorVisible("autor");
  const errorAnio = errorVisible("anio");
  const errorMiembro = errorVisible("miembroId");

  return (
    <form
      className="formulario-libro"
      onSubmit={manejarEnvio}
      noValidate
    >

      {/* ================================ */}
      {/* TÍTULO DEL LIBRO                 */}
      {/* ================================ */}

      <div className="formulario-campo">

        <label htmlFor="nuevo-titulo">
          Título del libro
        </label>

        <input
          id="nuevo-titulo"
          type="text"
          name="titulo"
          value={valores.titulo}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          maxLength={150}
          aria-invalid={Boolean(errorTitulo)}
          aria-describedby={
            errorTitulo
              ? "error-nuevo-titulo"
              : undefined
          }
        />

        {errorTitulo && (
          <p
            id="error-nuevo-titulo"
            className="error-campo"
          >
            {errorTitulo}
          </p>
        )}

      </div>

      {/* ================================ */}
      {/* AUTOR                            */}
      {/* ================================ */}

      <div className="formulario-campo">

        <label htmlFor="nuevo-autor">
          Autor del libro
        </label>

        <input
          id="nuevo-autor"
          type="text"
          name="autor"
          value={valores.autor}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          maxLength={120}
          aria-invalid={Boolean(errorAutor)}
          aria-describedby={
            errorAutor
              ? "error-nuevo-autor"
              : undefined
          }
        />

        {errorAutor && (
          <p
            id="error-nuevo-autor"
            className="error-campo"
          >
            {errorAutor}
          </p>
        )}

      </div>

      {/* ================================ */}
      {/* AÑO DE PUBLICACIÓN               */}
      {/* ================================ */}

      <div className="formulario-campo">

        <label htmlFor="nuevo-anio">
          Año de publicación
        </label>

        <input
          id="nuevo-anio"
          type="number"
          name="anio"
          min="1"
          max={new Date().getFullYear()}
          step="1"
          value={valores.anio}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          aria-invalid={Boolean(errorAnio)}
          aria-describedby={
            errorAnio
              ? "error-nuevo-anio"
              : undefined
          }
        />

        {errorAnio && (
          <p
            id="error-nuevo-anio"
            className="error-campo"
          >
            {errorAnio}
          </p>
        )}

      </div>

      {/* ================================ */}
      {/* MIEMBRO PROPONENTE                */}
      {/* ================================ */}

      <div className="formulario-campo">

        <label htmlFor="nuevo-miembro">
          Miembro que propone el libro
        </label>

        <select
          id="nuevo-miembro"
          name="miembroId"
          value={valores.miembroId}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          aria-invalid={Boolean(errorMiembro)}
          aria-describedby={
            errorMiembro
              ? "error-nuevo-miembro"
              : undefined
          }
        >

          <option value="">
            Selecciona un miembro
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

        {errorMiembro && (
          <p
            id="error-nuevo-miembro"
            className="error-campo"
          >
            {errorMiembro}
          </p>
        )}

      </div>

      {/* ================================ */}
      {/* BOTÓN Y RESULTADO                 */}
      {/* ================================ */}

      <button
        type="submit"
        className="btn-accion"
      >
        Agregar libro
      </button>

      {mensajeExito && (
        <p
          className="mensaje-exito"
          role="status"
        >
          {mensajeExito}
        </p>
      )}

    </form>
  );
}

export default FormularioLibro;