<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <h1>Registrarse</h1>
    <form>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label for="email">Nombre</label>
        <input type="text" id="name" class="form-control">
      </div>
      <button class="btn btn-primary" @click="register">Registrarse</button>
    </form>
    <p>{{ mensaje }}</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import validator from 'validator';
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      mensaje: ''
    };
  },
  methods: {
    async register() {
      if (!validator.isEmail(this.email)) {
        alert('El correo electrónico no es válido');
        return;
      }
      if (this.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      const Usuario = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
      // Realiza una solicitud POST al servidor para registrar el usuario
      const response = await axios.post('/usuarios', Usuario);

      // Si la solicitud es exitosa, muestra la respuesta en la interfaz de usuario
      this.mensaje = response.data.mensaje;
    } catch (error) {
      // Maneja cualquier error de solicitud (puedes mostrar un mensaje de error en la interfaz de usuario)
      console.error(error);
    }
    }
  }
}
</script>