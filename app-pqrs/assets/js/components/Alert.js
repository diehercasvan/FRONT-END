/**
 * Componente Alert (contenedor oculto por defecto)
 * @param {Object} props
 * @param {string} props.id      - id único del alert
 * @param {string} props.type    - 'success' | 'danger' | 'warning' | 'info'
 * @param {string} props.message - mensaje inicial
 * @returns {string} HTML del alert
 */
export function Alert({ id = 'app-alert', type = 'danger', message = '' } = {}) {
  return `
    <div id="${id}" class="alert alert-${type} d-none" role="alert" aria-live="polite">
      ${message}
    </div>`;
}

/**
 * Muestra un alert y lo oculta tras `time` ms
 */
export function showAlert(id, type, message, time = 3000) {
  const node = document.getElementById(id);
  if (!node) return;
  node.className = `alert alert-${type}`;
  node.textContent = message;
  node.classList.remove('d-none');

  clearTimeout(node._timer);
  node._timer = setTimeout(() => node.classList.add('d-none'), time);
}