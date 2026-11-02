
// =========================================
// MÓDULO: VALIDACIÓN DE FORMULARIOS
//
// Responsabilidades:
// - Validación HTML5 y JavaScript.
// - Constraint Validation API.
// - Reglas de fechas y año.
// - Mensajes personalizados por campo.
// - Validación de campos dinámicos.
// =========================================

/**
 * Obtiene la fecha local en formato YYYY-MM-DD.
 *
 * Evitamos toISOString() porque devuelve
 * fechas UTC y podría cambiar el día local.
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
 * Valida texto obligatorio después de eliminar
 * espacios iniciales y finales.
 *
 * Es una función pura: no necesita el DOM.
 * También podremos probarla con node:test.
 *
 * @param {string} valor
 * @param {number} minimo
 * @param {number} maximo
 * @returns {string} Mensaje de error o cadena vacía.
 */
export function obtenerErrorTexto(
  valor,
  minimo = 0,
  maximo = Infinity
) {
  const texto = String(valor ?? "").trim();

  if (texto.length === 0) {
    return "Este campo es obligatorio.";
  }

  if (minimo > 0 && texto.length < minimo) {
    return `Debes escribir al menos ${minimo} caracteres sin contar espacios exteriores.`;
  }

  if (
    Number.isFinite(maximo) &&
    texto.length > maximo
  ) {
    return `Se permiten como máximo ${maximo} caracteres.`;
  }

  return "";
}

/**
 * Actualiza los límites dependientes
 * de la fecha actual.
 */
function actualizarLimites(formulario) {
  const campoAnio = formulario.querySelector(
    "#anio-publicacion"
  );

  const campoFecha = formulario.querySelector(
    "#fecha-sesion"
  );

  campoAnio.max = String(
    new Date().getFullYear()
  );

  campoFecha.min = obtenerFechaLocal();
}

/**
 * Determina si un control utiliza
 * validación de texto obligatorio.
 */
function esCampoTexto(campo) {
  return (
    campo.required &&
    (
      campo.type === "text" ||
      campo.tagName === "TEXTAREA"
    )
  );
}

/**
 * Aplica las restricciones personalizadas.
 *
 * Se limpia primero cualquier error anterior.
 * Esto permite que un campo corregido
 * vuelva a considerarse válido.
 */
function aplicarReglasPersonalizadas(campo) {
  campo.setCustomValidity("");

  // Año de publicación.

  if (campo.id === "anio-publicacion") {
    const anioActual = new Date().getFullYear();

    if (
      campo.value !== "" &&
      Number(campo.value) > anioActual
    ) {
      campo.setCustomValidity(
        "El año de publicación no puede ser futuro."
      );
    }

    return;
  }

  // Fecha de sesión.

  if (campo.id === "fecha-sesion") {
    const fechaActual = obtenerFechaLocal();

    if (
      campo.value !== "" &&
      campo.value < fechaActual
    ) {
      campo.setCustomValidity(
        "La sesión no puede programarse en una fecha pasada."
      );
    }

    return;
  }

  // Campos de texto obligatorios.

  if (esCampoTexto(campo)) {
    const minimo = Number(
      campo.getAttribute("minlength") ?? 0
    );

    const maximoAtributo =
      campo.getAttribute("maxlength");

    const maximo =
      maximoAtributo === null
        ? Infinity
        : Number(maximoAtributo);

    // Dejamos que HTML5 gestione valueMissing
    // cuando el valor está completamente vacío.

    if (campo.value === "") {
      return;
    }

    const error = obtenerErrorTexto(
      campo.value,
      minimo,
      maximo
    );

    if (error) {
      campo.setCustomValidity(error);
    }
  }
}

/**
 * Devuelve el mensaje correspondiente
 * a la restricción incumplida.
 */
function obtenerMensajeError(campo) {
  const validez = campo.validity;

  // Los mensajes personalizados tienen
  // prioridad para año, fecha y texto.

  if (validez.customError) {
    return campo.validationMessage;
  }

  if (validez.valueMissing) {
    return "Este campo es obligatorio.";
  }

  if (validez.typeMismatch) {
    if (campo.type === "email") {
      return "Introduce un correo electrónico válido.";
    }

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
    return "Introduce un número entero permitido.";
  }

  if (validez.tooShort) {
    return `Debes escribir al menos ${campo.minLength} caracteres.`;
  }

  if (validez.tooLong) {
    return `Se permiten como máximo ${campo.maxLength} caracteres.`;
  }

  if (validez.patternMismatch) {
    return "Introduce un texto válido que contenga caracteres distintos de espacios.";
  }

  return "Revisa el valor introducido.";
}

/**
 * Obtiene o crea un elemento para mostrar
 * el error inmediatamente después del campo.
 */
function obtenerContenedorError(campo) {
  const idError = `${campo.id}-error`;

  let contenedor = document.getElementById(
    idError
  );

  if (!contenedor) {
    contenedor = document.createElement("div");

    contenedor.id = idError;
    contenedor.className = "invalid-feedback";

    campo.insertAdjacentElement(
      "afterend",
      contenedor
    );
  }

  // Conservamos otras descripciones accesibles
  // que pudiera tener el campo.

  const descripciones = (
    campo.getAttribute("aria-describedby") ?? ""
  )
    .split(/\s+/)
    .filter(Boolean);

  if (!descripciones.includes(idError)) {
    descripciones.push(idError);
  }

  campo.setAttribute(
    "aria-describedby",
    descripciones.join(" ")
  );

  return contenedor;
}

/**
 * Aplica las clases de Bootstrap y
 * actualiza el mensaje del campo.
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
    campo.setAttribute(
      "aria-invalid",
      "true"
    );

    contenedorError.textContent =
      obtenerMensajeError(campo);
  }

  return valido;
}

/**
 * Valida un control individual.
 */
export function validarCampo(campo) {
  aplicarReglasPersonalizadas(campo);

  return mostrarResultadoValidacion(campo);
}

/**
 * Valida todos los campos del formulario.
 *
 * Devuelve false si alguno no es válido.
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
 * Elimina mensajes y clases de validación.
 *
 * Se utiliza después de un envío exitoso.
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
 * Registra los eventos de validación.
 *
 * Los listeners se colocan en el formulario
 * para atender también campos creados
 * dinámicamente en tiempo de ejecución.
 */
export function inicializarValidacion(formulario) {
  actualizarLimites(formulario);

  // Validación mientras el usuario escribe.

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

  // Validación al confirmar cambios.

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

  // El evento invalid no hace bubbling.
  // Se captura desde el formulario.

  formulario.addEventListener(
    "invalid",
    (evento) => {
      validarCampo(evento.target);
    },
    true
  );

  // Refrescamos límites al volver al formulario.

  formulario.addEventListener(
    "focusin",
    () => {
      actualizarLimites(formulario);
    }
  );
}
