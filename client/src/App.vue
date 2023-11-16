<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.clearAuthData();
  router.push('/');
}

const isAuthenticated = () => authStore.getIsAuthenticated;

const showLogoutButton = () => {
  const route = router.currentRoute.value;
  return isAuthenticated() && route.meta.requiresAuth && !route.meta.hideLogoutButton;
};

router.beforeEach(() => {
  authStore.isAuthenticated = !!localStorage.getItem('token');
});
</script>

<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">DeckHelper</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <template v-if="!isAuthenticated()">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Inicio</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Registro</router-link>
              </li>
            </template>
            <li class="nav-item">
              <router-link to="/Contact" class="nav-link">Sobre Nosotros</router-link>
            </li>
            <template v-if="isAuthenticated()">
              <li class="nav-item">
                <router-link to="/Main" class="nav-link">Mis mazos</router-link>
              </li>
            </template>
            <li class="nav-item">
              <button v-if="isAuthenticated()" @click="logout" class="btn btn-link nav-link">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
