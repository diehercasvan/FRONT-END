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
  { href: 'register.html',        label: 'Registro' },
  { href: 'forgot-password.html', label: 'Recuperar' },
  { href: 'change-password.html', label: 'Cambiar' },
];

export function LoginView() {
  render('#app-navbar', Navbar({
    brand: 'Mi App', links: NAV_LINKS, activeLink: 'index.html'
  }));

  render('#app-main', `
    <div class="auth-card card p-4">
      <h1 class="h4 mb-4 text-center">Iniciar sesión</h1>

      ${Alert({ id: 'login-alert' })}

      <form id="login-form" novalidate>
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input type="text" class="form-control" id="username"
                 name="username" autocomplete="username" required>
        </div>

        ${PasswordInput({
          id: 'password',
          label: 'Contraseña',
          name: 'password',
          pattern: PATTERN_PASSWORD,
          title: 'Mín. 8, mayús, minús, número y especial',
          autocomplete: 'current-password'
        })}

        <button type="submit" class="btn btn-success w-100">Ingresar</button>

        <div class="d-flex justify-content-between mt-3">
          <a href="forgot-password.html" class="small">¿Olvidaste tu contraseña?</a>
          <a href="register.html" class="small">Crear cuenta</a>
        </div>
      </form>
    </div>`);

  render('#app-footer', Footer({ text: 'Mi App' }));

  bindPasswordToggles();
  bindLoginEvents();
}

function bindLoginEvents() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showPreloader();

    // 1) Validación por campo
    const result = validateForm(form);
    if (result !== true) {
      console.warn('⚠️ [LOGIN] Validación fallida:', result);
      showAlert('login-alert', 'danger', result);
      hidePreloader();
      return;
    }

    // 2) Payload que se enviaría al backend
    const payload = {
      user_name:     form.username.value.trim(),
      user_password: form.password.value,
      timestamp:     new Date().toISOString(),
    };

    console.group('🟢 [LOGIN] Payload capturado');
    console.log('Endpoint:', '/login');
    console.log('Método:', 'POST');
    console.table(payload);
    console.log('Objeto completo:', payload);
    console.log('Longitud usuario:', payload.user_name.length);
    console.log('Longitud contraseña:', payload.user_password.length);
    console.groupEnd();

    try {
      const response = await fakeRequest('/login', payload);

      console.group('✅ [LOGIN] Respuesta del servidor');
      console.log('Status:', response.status);
      console.log('Message:', response.message);
      console.log('Data:', response.data);
      console.groupEnd();

      showAlert('login-alert', 'success', '¡Bienvenido!');
      form.reset();

    } catch (err) {
      console.group('❌ [LOGIN] Error');
      console.error(err);
      console.groupEnd();
      showAlert('login-alert', 'danger', err.message);
    } finally {
      hidePreloader();
    }
  });
}