import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {pinia, useAuthStore} from './store';

const app = createApp(App);

app.use(pinia);

const authStore = useAuthStore();

app.use(router);

app.mount('#app')