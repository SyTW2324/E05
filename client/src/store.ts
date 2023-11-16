import { defineStore, createPinia } from 'pinia';
import axios from 'axios';

export const pinia = createPinia();

interface Usuario {
  email: string;
  contrasena: string;
  nombre: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    token: '',
    nombreUsuario: '',
    email: '',
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    setAuthData(token: string, nombreUsuario: string, email: string) {
      this.token = token;
      this.nombreUsuario = nombreUsuario;
      this.email = email;
      this.isAuthenticated = true;
    },
    clearAuthData() {
      this.token = '';
      this.nombreUsuario = '';
      this.email = '';
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    async login(email: string, contrasena: string) {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/login', {
          email,
          contrasena,
        });

        const { token, nombreUsuario } = response.data;
        localStorage.setItem('token', token);
        this.setAuthData(token, nombreUsuario, email);

        return { success: true, message: 'Inicio de sesión exitoso' };
      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.clearAuthData();
        localStorage.removeItem('token');

        return { success: false, message: 'Error en la solicitud' };
      }
    },
    async registerUsuario(usuario: Usuario) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });

        if (response.ok) {
          const data = await response.json();
          // Almacenar el token
          const token = data.token;
          this.setAuthData(token, usuario.nombre, usuario.email);
          return { success: true, message: data.mensaje };
        } else {
          // Maneja errores de respuesta
          const errorData = await response.json();
          console.error('Error en la solicitud:', errorData.error);
          return { success: false, message: `Error: ${errorData.error}` };
        }
      } catch (error) {
        // Maneja errores de red o de solicitud
        console.error('Error en la solicitud:', error);
        return { success: false, message: 'Error en la solicitud' };
      }
    },
  },
});


