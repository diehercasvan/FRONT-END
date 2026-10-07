/**
 * Simula una petición al backend con delay
 * @param {string} endpoint
 * @param {Object} payload
 * @param {number} delay ms
 * @returns {Promise<{status:number, data:Object, message:string}>}
 */
export function fakeRequest(endpoint, payload, delay = 900) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      // Simulación: contraseña "wrong" produce error en login
      if (endpoint === '/login' && payload.user_password === 'wrong') {
        reject(new Error('Credenciales inválidas'));
        return;
      }

      // Simulación: correo ya registrado
      if (endpoint === '/register' && payload.user_email === 'test@test.com') {
        reject(new Error('El correo ya está registrado'));
        return;
      }

      resolve({
        status: 200,
        data: payload,
        message: `OK ${endpoint}`
      });
    }, delay);
  });
}