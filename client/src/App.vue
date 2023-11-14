<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
}

const isAuthenticated = ref(false);

const showLogoutButton = () => {
  const route = router.currentRoute.value;
  return isAuthenticated.value && route.meta.requiresAuth && !route.meta.hideLogoutButton;
};

router.beforeEach((to, from, next) => {
  isAuthenticated.value = !!localStorage.getItem('token');
  next();
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
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/register" class="nav-link">Registro</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Contact" class="nav-link">Sobre Nosotros</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Main" class="nav-link">Mis mazos</router-link>
            </li>
            <li class="nav-item">
            <button v-if="isAuthenticated && showLogoutButton" @click="logout" class="btn btn-link nav-link">Cerrar Sesión</button>
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