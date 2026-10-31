// =========================================
// MÓDULO: VALIDACIÓN DE FORMULARIOS
// Responsabilidades:
// - Aplicar restricciones dinámicas.
// - Utilizar la Constraint Validation API.
// - Mostrar errores junto a los campos.
// - Validar campos agregados posteriormente.
// =========================================

/**
 * Devuelve la fecha local en formato YYYY-MM-DD.
 *
 * No usamos toISOString() porque trabaja en UTC
 * y podría producir una fecha distinta de la local.
 */
function obtenerFechaLocal() {
  const hoy = new Date();

  const anio = hoy.getFullYear();

  const mes = String(
    hoy.getMonth() + 1
  ).padStart(2, "0");

  const dia = String(
    hoy.getDate()
  ).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

/**
 * Configura los límites que cambian con el tiempo.
 */
function actualizarLimites(formulario) {
  const anio = formulario.querySelector(
    "#anio-publicacion"
  );

  const fecha = formulario.querySelector(
    "#fecha-sesion"
  );

  anio.max = String(
    new Date().getFullYear()
  );

  fecha.min = obtenerFechaLocal();
}

/**
 * Establece reglas personalizadas.
 *
 * setCustomValidity("") es imprescindible:
 * elimina un error personalizado anterior.
 */
function aplicarReglasPersonalizadas(campo) {
  if (campo.id === "anio-publicacion") {
    campo.setCustomValidity("");

    const anioActual = new Date().getFullYear();

    if (
      campo.value !== "" &&
      Number(campo.value) > anioActual
    ) {
      campo.setCustomValidity(
        "El año de publicación no puede ser futuro."
      );
    }
  }

  if (campo.id === "fecha-sesion") {
    campo.setCustomValidity("");

    if (
      campo.value !== "" &&
      campo.value < obtenerFechaLocal()
    ) {
      campo.setCustomValidity(
        "La sesión no puede programarse en una fecha pasada."
      );
    }
  }
}

/**
 * Traduce las restricciones HTML5
 * a mensajes más comprensibles.
 */
function obtenerMensajeError(campo) {
  const validez = campo.validity;

  if (validez.valueMissing) {
    return "Este campo es obligatorio.";
  }

  if (validez.typeMismatch) {
    return "Introduce un valor con el formato correcto.";
  }

  if (validez.badInput) {
    return "Introduce un número válido.";
  }

  if (validez.rangeUnderflow) {
    return `El valor mínimo permitido es ${campo.min}.`;
  }

  if (validez.rangeOverflow) {
    return `El valor máximo permitido es ${campo.max}.`;
  }

  if (validez.stepMismatch) {
    return "Introduce un valor entero permitido.";
  }

  if (validez.tooShort) {
    return `Debes escribir al menos ${campo.minLength} caracteres.`;
  }

  if (validez.tooLong) {
    return `Se permiten como máximo ${campo.maxLength} caracteres.`;
  }

  if (validez.patternMismatch) {
    return "El valor no cumple el formato requerido.";
  }

  if (validez.customError) {
    return campo.validationMessage;
  }

  return "Revisa el valor introducido.";
}

/**
 * Crea el espacio del mensaje de error
 * si todavía no existe.
 *
 * Los campos nuevos también utilizarán
 * esta misma función.
 */
function obtenerContenedorError(campo) {
  const idError = `${campo.id}-error`;

  let error = document.getElementById(idError);

  if (!error) {
    error = document.createElement("div");

    error.id = idError;
    error.className = "invalid-feedback";

    campo.insertAdjacentElement(
      "afterend",
      error
    );
  }

  campo.setAttribute(
    "aria-describedby",
    idError
  );

  return error;
}

/**
 * Actualiza las clases CSS y el mensaje
 * utilizando la validez actual del campo.
 */
function mostrarResultadoValidacion(campo) {
  const valido = campo.validity.valid;

  const contenedorError =
    obtenerContenedorError(campo);

  campo.classList.toggle(
    "is-invalid",
    !valido
  );

  campo.classList.toggle(
    "is-valid",
    valido && campo.value.trim() !== ""
  );

  if (valido) {
    campo.removeAttribute("aria-invalid");
    contenedorError.textContent = "";
  } else {
    campo.setAttribute("aria-invalid", "true");

    contenedorError.textContent =
      obtenerMensajeError(campo);
  }

  return valido;
}

/**
 * Valida un campo individual.
 */
export function validarCampo(campo) {
  aplicarReglasPersonalizadas(campo);

  return mostrarResultadoValidacion(campo);
}

/**
 * Valida todos los controles del formulario.
 *
 * Devuelve true solamente cuando
 * todos los campos son válidos.
 */
export function validarFormulario(formulario) {
  actualizarLimites(formulario);

  const campos = formulario.querySelectorAll(
    "input, select, textarea"
  );

  let formularioValido = true;

  campos.forEach((campo) => {
    const valido = validarCampo(campo);

    if (!valido) {
      formularioValido = false;
    }
  });

  return formularioValido;
}

/**
 * Elimina los mensajes y clases de validación.
 *
 * Será útil después de un envío exitoso.
 */
export function limpiarValidacion(formulario) {
  const campos = formulario.querySelectorAll(
    "input, select, textarea"
  );

  campos.forEach((campo) => {
    campo.setCustomValidity("");

    campo.classList.remove(
      "is-valid",
      "is-invalid"
    );

    campo.removeAttribute("aria-invalid");

    const error = document.getElementById(
      `${campo.id}-error`
    );

    if (error) {
      error.textContent = "";
    }
  });
}

/**
 * Registra listeners en el formulario.
 *
 * La delegación de input y change permite
 * validar también los campos creados
 * dinámicamente en el commit 07.
 */
export function inicializarValidacion(formulario) {
  actualizarLimites(formulario);

  formulario.addEventListener(
    "input",
    (evento) => {
      if (
        evento.target.matches(
          "input, select, textarea"
        )
      ) {
        validarCampo(evento.target);
      }
    }
  );

  formulario.addEventListener(
    "change",
    (evento) => {
      if (
        evento.target.matches(
          "input, select, textarea"
        )
      ) {
        actualizarLimites(formulario);
        validarCampo(evento.target);
      }
    }
  );

  // El evento invalid no se propaga mediante
  // bubbling, pero sí puede capturarse.
  //
  // Esto permite mostrar errores incluso
  // cuando HTML5 bloquea el evento submit.

  formulario.addEventListener(
    "invalid",
    (evento) => {
      mostrarResultadoValidacion(evento.target);
    },
    true
  );

  formulario.addEventListener(
    "focusin",
    () => actualizarLimites(formulario)
  );
}