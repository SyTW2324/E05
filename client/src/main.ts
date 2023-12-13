import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { pinia, useAuthStore } from './store';

const app = createApp(App);

app.use(pinia);

const authStore = useAuthStore();

const storedToken = localStorage.getItem('token');
if (storedToken) {
  const storedNombreUsuario = localStorage.getItem('nombreUsuario');
  const storedEmail = localStorage.getItem('email');

  authStore.setAuthData(storedToken, storedNombreUsuario, storedEmail);
}

app.use(router);

app.mount('#app');
