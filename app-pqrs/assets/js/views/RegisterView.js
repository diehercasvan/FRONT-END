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

export function RegisterView() {
  render('#app-navbar', Navbar({
    brand: 'Mi App', links: NAV_LINKS, activeLink: 'register.html'
  }));

  render('#app-main', `
    <div class="auth-card card p-4">
      <h1 class="h4 mb-4 text-center">Crear cuenta</h1>

      ${Alert({ id: 'register-alert' })}

      <form id="register-form" novalidate>

        <div class="mb-3">
          <label for="fullname" class="form-label">Nombre completo</label>
          <input type="text" class="form-control" id="fullname"
                 name="fullname" autocomplete="name" required>
        </div>

        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input type="text" class="form-control" id="username"
                 name="username" autocomplete="username" required>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" id="email"
                 name="email" autocomplete="email" required>
        </div>

        ${PasswordInput({
          id: 'password',
          label: 'Contraseña',
          name: 'password',
          pattern: PATTERN_PASSWORD,
          title: 'Mín. 8, mayús, minús, número y especial',
          autocomplete: 'new-password'
        })}

        ${PasswordInput({
          id: 'confirmPassword',
          label: 'Confirmar contraseña',
          name: 'confirmPassword',
          autocomplete: 'new-password'
        })}

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
          <label class="form-check-label" for="terms">
            Acepto los <a href="#" class="small">términos y condiciones</a>
          </label>
        </div>

        <button type="submit" class="btn btn-success w-100">Registrarme</button>

        <div class="text-center mt-3">
          <span class="small text-muted">¿Ya tienes cuenta?</span>
          <a href="index.html" class="small">Iniciar sesión</a>
        </div>
      </form>
    </div>`);

  render('#app-footer', Footer({ text: 'Mi App' }));

  bindPasswordToggles();
  bindRegisterEvents();
}

function bindRegisterEvents() {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showPreloader();

    // 1) Validación por campo
    const result = validateForm(form);
    if (result !== true) {
      showAlert('register-alert', 'danger', result);
      hidePreloader();
      return;
    }

    // 2) Validación del checkbox de términos
    if (!form.terms.checked) {
      showAlert('register-alert', 'warning', 'Debes aceptar los términos y condiciones.');
      hidePreloader();
      return;
    }

    // 3) Payload que se enviaría al backend
    const payload = {
      fullname:        form.fullname.value.trim(),
      user_name:       form.username.value.trim(),
      user_email:      form.email.value.trim(),
      user_password:   form.password.value,
      terms_accepted:  form.terms.checked,
      created_at:      new Date().toISOString(),
    };

    console.group('🟢 [REGISTER] Payload capturado');
    console.log('Endpoint:', '/register');
    console.log('Método:', 'POST');
    console.table(payload);
    console.log('Objeto completo:', payload);
    console.groupEnd();

    try {
      const response = await fakeRequest('/register', payload);

      console.group('✅ [REGISTER] Respuesta del servidor');
      console.log('Status:', response.status);
      console.log('Message:', response.message);
      console.log('Data:', response.data);
      console.groupEnd();

      showAlert('register-alert', 'success', '¡Cuenta creada correctamente!');
      form.reset();

      // Redirige al login tras 1.5s
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);

    } catch (err) {
      console.group('❌ [REGISTER] Error');
      console.error(err);
      console.groupEnd();
      showAlert('register-alert', 'danger', err.message);
    } finally {
      hidePreloader();
    }
  });
}