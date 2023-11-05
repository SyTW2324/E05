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
  <div>
    <h1>DeskHelper</h1>
    <p>Esto es una prueba</p>
    <p>Mensaje del servidor:</p>
    <p>{{ serverMessage }}</p>
  </div>
</template>