// =========================================
// MÓDULO: FORMULARIO DE PROPUESTAS
// Responsabilidad:
// Coordinar validación y envío.
// =========================================

import {
  inicializarValidacion,
  validarFormulario
} from "./validacion.js";

/**
 * Presenta un mensaje visual al usuario.
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
 * Configura el formulario de propuestas.
 */
export function iniciarFormularioPropuesta() {
  const formulario = document.querySelector(
    "#form-propuesta"
  );

  inicializarValidacion(formulario);

  formulario.addEventListener(
    "submit",
    (evento) => {
      evento.preventDefault();

      const valido = validarFormulario(
        formulario
      );

      if (!valido) {
        mostrarEstado(
          "Corrige los campos señalados antes de continuar.",
          "danger"
        );

        formulario.reportValidity();
        return;
      }

      mostrarEstado(
        "Validación correcta. El envío al servidor se incorporará en el commit 07.",
        "success"
      );
    }
  );
}