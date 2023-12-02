import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {pinia, useAuthStore} from './store';

const app = createApp(App);

app.use(pinia);

const authStore = useAuthStore();

// Verifica si hay un token almacenado en localStorage al iniciar la aplicación
const storedToken = localStorage.getItem('token');
if (storedToken) {
  // Establece el estado de useAuthStore con el token almacenado
  const authStore = useAuthStore();
  authStore.setAuthData(storedToken, localStorage.getItem('nombreUsuario'), localStorage.getItem('email'));
}


app.use(router);

app.mount('#app')