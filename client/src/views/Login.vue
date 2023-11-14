<script lang="ts">
import axios from 'axios';
import validator from 'validator';
export default {
  data() {
    return {
      email: '',
      contrasena: '',
      mensaje: ''
    };
  },
  methods: {
    async login() {
      if (!validator.isEmail(this.email)) {
        alert('El correo electrónico no es válido');
        return;
      }
      const Usuario = {
        email: this.email,
        contrasena: this.contrasena
      };
      try {
        const response = await axios.post('http://localhost:3000/usuarios/login', Usuario);
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/Main');
      } catch (error) {
        // Maneja errores de red o de solicitud
        console.error('Error en la solicitud:', error);
        this.mensaje = 'Error en la solicitud';
        alert('Error en la solicitud');
      }
    }
  }
}
</script>

<template>
  <div class="background">
  <div class="content-box">
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" class="form-control" v-model="contrasena">
      </div>
      <button class="btn btn-primary" type="submit">Iniciar Sesión</button>
    </form>
    <p>{{ mensaje }}</p>
  </div>
  </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url('https://bnetcmsus-a.akamaihd.net/cms/gallery/ASW4ACCHGE991428977059569.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
  border: 1px solid #ccc; /* Borde gris */
  border-radius: 10px; /* Borde redondeado */
  padding: 20px;
  text-align: center;
}

/* Resto de tus estilos */
</style>

