import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { Alert, showAlert } from '../components/Alert.js';
import { PasswordInput, bindPasswordToggles } from '../components/PasswordInput.js';
import { render } from '../utils/dom.js';
import { validateForm, PATTERN_PASSWORD } from '../utils/validators.js';
import { fakeRequest } from '../utils/http.js';
import { showPreloader, hidePreloader } from '../components/Preloader.js';

const NAV_LINKS = [
  { href: 'index.html',           label: 'Login' },
  { href: 'forgot-password.html', label: 'Recuperar' },
  { href: 'change-password.html', label: 'Cambiar' },
];

export function ChangePasswordView() {
  render('#app-navbar', Navbar({
    brand: 'Mi App', links: NAV_LINKS, activeLink: 'change-password.html'
  }));

  render('#app-main', `
    <div class="auth-card card p-4">
      <h1 class="h4 mb-4 text-center">Cambiar contraseña</h1>

      ${Alert({ id: 'change-alert' })}

      <form id="change-form" novalidate>
        ${PasswordInput({
          id: 'currentPassword',
          label: 'Contraseña actual',
          name: 'currentPassword',
          autocomplete: 'current-password'
        })}

        ${PasswordInput({
          id: 'newPassword',
          label: 'Nueva contraseña',
          name: 'newPassword',
          pattern: PATTERN_PASSWORD,
          title: 'Mín. 8, mayús, minús, número y especial',
          autocomplete: 'new-password'
        })}

        ${PasswordInput({
          id: 'confirmPassword',
          label: 'Confirmar nueva contraseña',
          name: 'confirmPassword',
          autocomplete: 'new-password'
        })}

        <button type="submit" class="btn btn-success w-100">Actualizar contraseña</button>

        <div class="text-center mt-3">
          <a href="index.html" class="small">Volver al login</a>
        </div>
      </form>
    </div>`);

  render('#app-footer', Footer({ text: 'Mi App' }));

  bindPasswordToggles();
  bindChangeEvents();
}

function bindChangeEvents() {
  const form = document.getElementById('change-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showPreloader();

    const result = validateForm(form);
    if (result !== true) {
      showAlert('change-alert', 'danger', result);
      hidePreloader();
      return;
    }

    try {
      await fakeRequest('/change-password', {
        current: form.currentPassword.value,
        new:     form.newPassword.value,
      });
      showAlert('change-alert', 'success', 'Contraseña actualizada correctamente.');
      form.reset();
    } catch (err) {
      showAlert('change-alert', 'danger', err.message);
    } finally {
      hidePreloader();
    }
  });
}