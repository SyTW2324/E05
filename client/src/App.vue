<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/login">Iniciar Sesión</router-link>
        <router-link to="/register">Registro</router-link>
      </nav>
    </header>
    
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
