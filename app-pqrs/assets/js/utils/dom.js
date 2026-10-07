/** querySelector corto */
export const qs  = (sel, root = document) => root.querySelector(sel);

/** querySelectorAll corto (devuelve array) */
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/**
 * Reemplaza el innerHTML del elemento que coincida con `selector`
 */
export function render(selector, html) {
  const el = qs(selector);
  if (el) el.innerHTML = html;
}