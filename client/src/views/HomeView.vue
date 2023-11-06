<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      serverMessage: '', // Aquí almacenaremos el mensaje del servidor
    };
  },
  mounted() {
    // Realiza una solicitud GET al servidor al cargar el componente
    fetch('http://localhost:3000/') // Asegúrate de ajustar la URL del servidor si es diferente
      .then((response) => response.text())
      .then((data) => {
        this.serverMessage = data; // Almacena el mensaje del servidor en la variable serverMessage
        console.log(data);
      });
  },
};
</script>

<template>
  <div class="background">
    <h1 class="title">Deck Helper</h1>
    <div class="message-container">
      <p class="message">Bienvenido a la mejor página web para poder subir y compartir mazos de Hearthstone</p>
      <p class="message">{{ serverMessage }}</p>
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
  transition: background-color 0.3s; /* Agregar una transición suave */
}

.action-button:hover {
  background-color: #0b1825; /* Cambiar el color al pasar el ratón por encima */
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





