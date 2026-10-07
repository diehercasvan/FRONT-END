/**
 * Componente input password con botón de toggle (ojo)
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} props.pattern
 * @param {string} props.title
 * @param {string} props.autocomplete
 * @returns {string} HTML del input group
 */
export function PasswordInput({
  id = 'password',
  label = 'Contraseña',
  name = 'password',
  pattern = '',
  title = '',
  autocomplete = 'current-password'
} = {}) {
  return `
    <div class="mb-3">
      <label for="${id}" class="form-label">${label}</label>
      <div class="input-group">
        <input type="password" class="form-control"
               id="${id}" name="${name}"
               data-type="password"
               pattern="${pattern}" title="${title}"
               autocomplete="${autocomplete}" required>
        <button class="btn btn-outline-secondary" type="button"
                data-toggle-password="${id}" aria-label="Mostrar contraseña">
          <i class="bi bi-eye"></i>
        </button>
      </div>
    </div>`;
}

/**
 * Activa los botones toggle dentro de un root (por defecto, document)
 */
export function bindPasswordToggles(root = document) {
  root.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.togglePassword);
      const icon  = btn.querySelector('i');
      const hidden = input.type === 'password';
      input.type = hidden ? 'text' : 'password';
      icon.className = hidden ? 'bi bi-eye-slash' : 'bi bi-eye';
    });
  });
}