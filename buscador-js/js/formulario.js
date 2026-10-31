// =========================================
// MÓDULO: FORMULARIO DE PROPUESTAS
// Responsabilidades:
// - Coordinar la validación.
// - Recopilar la información.
// - Enviar datos asincrónicamente.
// - Mostrar mensajes sin recargar.
// =========================================

import {
  inicializarValidacion,
  validarFormulario,
  limpiarValidacion
} from "./validacion.js";

import {
  inicializarAutores,
  obtenerAutores,
  reiniciarAutores
} from "./autores.js";

import {
  enviarPropuesta
} from "./api-propuestas.js";

/**
 * Muestra el estado de una operación.
 */
function mostrarEstado(mensaje, tipo) {
  const contenedor = document.querySelector(
    "#estado-propuesta"
  );

  contenedor.hidden = false;

  contenedor.className =
    `alert alert-${tipo} mt-3`;

  contenedor.textContent = mensaje;
}

/**
 * Recopila todos los campos.
 *
 * El resultado es un objeto JavaScript
 * independiente del formulario HTML.
 */
function recopilarPropuesta(formulario) {
  return {

    titulo: formulario.elements.titulo.value.trim(),

    autores: obtenerAutores(formulario),

    anio: Number(
      formulario.elements.anio.value
    ),

    paginas: Number(
      formulario.elements.paginas.value
    ),

    genero: formulario.elements.genero.value,

    correo: formulario.elements.correo.value.trim(),

    fechaSesion:
      formulario.elements.fechaSesion.value,

    motivo: formulario.elements.motivo.value.trim()

  };
}

/**
 * Inicializa las interacciones del formulario.
 */
export function iniciarFormularioPropuesta() {
  const formulario = document.querySelector(
    "#form-propuesta"
  );

  const botonEnviar = document.querySelector(
    "#btn-enviar-propuesta"
  );

  // Activamos los módulos independientes.

  inicializarValidacion(formulario);
  inicializarAutores();

  // Envío asincrónico.

  formulario.addEventListener(
    "submit",
    async (evento) => {

      evento.preventDefault();

      const formularioValido =
        validarFormulario(formulario);

      if (!formularioValido) {

        mostrarEstado(
          "Corrige los campos señalados antes de enviar.",
          "danger"
        );

        formulario.reportValidity();

        return;
      }

      // Construimos el objeto que enviaremos.

      const propuesta = recopilarPropuesta(
        formulario
      );

      // Evita envíos simultáneos.

      botonEnviar.disabled = true;

      mostrarEstado(
        "Enviando la propuesta...",
        "info"
      );

      try {

        const respuesta = await enviarPropuesta(
          propuesta
        );

        mostrarEstado(
          `Propuesta enviada correctamente. Referencia simulada: ${respuesta.id ?? "sin identificador"}.`,
          "success"
        );

        // Limpiamos el formulario solamente
        // cuando el envío es exitoso.

        formulario.reset();

        reiniciarAutores();

        limpiarValidacion(formulario);

      } catch (error) {

        console.error(
          "Error al enviar la propuesta:",
          error
        );

        mostrarEstado(
          "No se pudo enviar la propuesta. Comprueba tu conexión e intenta nuevamente.",
          "danger"
        );

      } finally {

        // Habilitamos el botón tanto después
        // del éxito como después de un error.

        botonEnviar.disabled = false;

      }

    }
  );
}