/**
 * Componente Footer
 * @param {Object} props
 * @param {number} props.year - Año del copyright
 * @param {string} props.text - Texto de la marca
 * @returns {string} HTML del footer
 */
export function Footer({ year = new Date().getFullYear(), text = 'Mi App' } = {}) {
  return `
    <footer>
      <p>&copy; ${year} ${text}. All rights reserved.</p>
    </footer>`;
}