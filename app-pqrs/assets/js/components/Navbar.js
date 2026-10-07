/**
 * Componente Navbar
 * @param {Object} props
 * @param {string} props.brand       - Nombre de la marca
 * @param {Array}  props.links       - [{ href, label }]
 * @param {string} props.activeLink  - href del link activo
 * @returns {string} HTML del navbar
 */
export function Navbar({ brand = 'Mi App', links = [], activeLink = '' } = {}) {
  const items = links.map(l => `
    <li class="nav-item">
      <a class="nav-link ${l.href === activeLink ? 'active fw-bold' : ''}"
         href="${l.href}">${l.label}</a>
    </li>`).join('');

  return `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
          <img src="assets/img/logo.png" alt="Logo" height="32">
          <span>${brand}</span>
        </a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navMain"
                aria-controls="navMain" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav ms-auto">${items}</ul>
        </div>
      </div>
    </nav>`;
}