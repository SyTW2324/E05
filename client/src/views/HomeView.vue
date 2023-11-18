<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="background">
    <h1 class="title">Deck Helper</h1>
    <div class="message-container">
      <p class="message">Bienvenido a la mejor página web para poder subir y compartir mazos de Hearthstone</p>
      <p class="message">Esta es la página de inicio de usuarios</p>
    </div>
    <div class="buttons">
      <router-link to="/register" class="action-button">Registrarse</router-link>
      <router-link to="/login" class="action-button">Iniciar Sesión</router-link>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  margin: 0 auto;
}

.title {
  color: #f5f4fc;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.message {
  background-color: #E0FFFF;
  color: #000000;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.button {
  background-color: #2e86de;
  color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.action-button {
  background-color: #2e86de;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s; 
}

.action-button:hover {
  background-color: #0b1825; 
}

.background {
  background-image: url('https://bnetcmsus-a.akamaihd.net/cms/gallery/ASW4ACCHGE991428977059569.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  margin-top: 0px;
  height: 100vh;
}
</style>