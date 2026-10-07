/** Expresiones regulares reutilizables */
export const REGEX = {
  username: /^[a-zA-Z]{3,16}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*?_\-]).{8,}$/,
  email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

/** Pattern compatible con la bandera `v` del navegador */
export const PATTERN_PASSWORD =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*?_\\-]).{8,}$';

/**
 * Valida un input individual
 * @param {HTMLInputElement} input
 * @returns {true|string} true si es válido, string con mensaje si no
 */
export function validateField(input) {
  const v = input.value.trim();
  switch (input.name) {
    case 'fullname':
      return v.length >= 3 || 'El nombre debe tener al menos 3 caracteres.';
    case 'username':
      return REGEX.username.test(v) || 'Usuario: solo letras, entre 3 y 16 caracteres.';
    case 'email':
      return REGEX.email.test(v) || 'Ingresa un correo electrónico válido.';
    case 'password':
    case 'newPassword':
      return REGEX.password.test(v)
        || 'Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
    case 'confirmPassword':
       return v === input.form.newPassword?.value
        || v === input.form.password?.value
        || 'Las contraseñas no coinciden.';
    default:
      return true;
  }
}

/**
 * Valida todos los inputs requeridos de un formulario
 * @param {HTMLFormElement} form
 * @returns {true|string}
 */
export function validateForm(form) {
  for (const input of form.querySelectorAll('input[required]')) {
    const result = validateField(input);
    if (result !== true) {
      input.classList.add('is-invalid');
      return result;
    }
    input.classList.remove('is-invalid');
  }
  return true;
}