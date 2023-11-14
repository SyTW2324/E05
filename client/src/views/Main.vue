<template>
  <div class="main-page">
    <div class="background">
      <div class="content-box">
        <h1>Bienvenido {{ usuarioNombre }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuarioNombre: '',
    };
  },
  mounted() {
    // Obtén el token de alguna manera (puedes guardarlo en el localStorage, por ejemplo)
    const token = localStorage.getItem('token');

    // Realiza una solicitud GET al servidor al cargar el componente
    axios.get('http://localhost:3000/usuarios', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Accede directamente a los datos en lugar de llamar a response.json()
        this.usuarioNombre = response.data.decodednombre;
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la información del usuario:', error);
      });
  },
};
</script>

<style scoped>
/* Estilos de tu componente */
</style>
