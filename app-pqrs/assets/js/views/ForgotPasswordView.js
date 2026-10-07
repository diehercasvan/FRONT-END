import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { Alert, showAlert } from '../components/Alert.js';
import { render } from '../utils/dom.js';
import { REGEX } from '../utils/validators.js';
import { fakeRequest } from '../utils/http.js';
import { showPreloader, hidePreloader } from '../components/Preloader.js';

const NAV_LINKS = [
  { href: 'index.html',           label: 'Login' },
  { href: 'forgot-password.html', label: 'Recuperar' },
  { href: 'change-password.html', label: 'Cambiar' },
];

export function ForgotPasswordView() {
  render('#app-navbar', Navbar({
    brand: 'Mi App', links: NAV_LINKS, activeLink: 'forgot-password.html'
  }));

  render('#app-main', `
    <div class="auth-card card p-4">
      <h1 class="h4 mb-2 text-center">Recuperar contraseña</h1>
      <p class="text-muted small text-center mb-4">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      ${Alert({ id: 'forgot-alert' })}

      <form id="forgot-form" novalidate>
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" id="email"
                 name="email" autocomplete="email" required>
        </div>

        <button type="submit" class="btn btn-success w-100">Enviar enlace</button>

        <div class="text-center mt-3">
          <a href="index.html" class="small">Volver al login</a>
        </div>
      </form>
    </div>`);

  render('#app-footer', Footer({ text: 'Mi App' }));
  bindForgotEvents();
}

function bindForgotEvents() {
  const form = document.getElementById('forgot-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showPreloader();

    const email = form.email.value.trim();
    if (!REGEX.email.test(email)) {
      showAlert('forgot-alert', 'danger', 'Correo inválido');
      hidePreloader();
      return;
    }

    try {
      await fakeRequest('/forgot-password', { email });
      showAlert(
        'forgot-alert',
        'success',
        'Si el correo existe, recibirás un enlace en breve.',
        4000
      );
      form.reset();
    } catch (err) {
      showAlert('forgot-alert', 'danger', err.message);
    } finally {
      hidePreloader();
    }
  });
}