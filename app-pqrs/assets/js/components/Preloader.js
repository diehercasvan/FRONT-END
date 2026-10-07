let el;

/**
 * Crea (una sola vez) el nodo del preloader en el DOM
 * @returns {HTMLElement}
 */
export function Preloader() {
  if (!el) {
    el = document.createElement('div');
    el.className = 'preloader';
    el.id = 'preloader';
    el.innerHTML = `
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>`;
    document.body.appendChild(el);
  }
  return el;
}

export function showPreloader() {
  Preloader().classList.add('is-visible');
}

export function hidePreloader() {
  const node = Preloader();
  node.classList.remove('is-visible');
}