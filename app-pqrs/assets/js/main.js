/**
 * main.js — bootstrap de la aplicación
 * Detecta la vista según la URL y la monta en #app-main.
 * Esto es un "mini-router" que imita a React Router / Vue Router.
 */
import { Preloader, showPreloader, hidePreloader } from './components/Preloader.js';
import { LoginView }          from './views/LoginView.js';
import { RegisterView }       from './views/RegisterView.js';
import { ForgotPasswordView } from './views/ForgotPasswordView.js';
import { ChangePasswordView } from './views/ChangePasswordView.js';

/** Mapa de rutas → vistas */
const ROUTES = {
  'index.html':           LoginView,
  'register.html':        RegisterView,
  'forgot-password.html': ForgotPasswordView,
  'change-password.html': ChangePasswordView,
};

/** Detecta la vista a partir de la URL actual */
function resolveView() {
  const page = location.pathname.split('/').pop() || 'index.html';
  return ROUTES[page] || LoginView;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Crea el nodo del preloader (una sola vez)
  Preloader();

  // 2) Muestra el preloader mientras se "monta" la vista
  showPreloader();

  // 3) Resuelve y ejecuta la vista correspondiente
  const view = resolveView();
  view();

  // 4) Oculta el preloader tras un pequeño delay (simula carga)
  setTimeout(hidePreloader, 500);
});