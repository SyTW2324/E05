<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <h1>Registrarse</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" class="form-control" v-model="contrasena">
      </div>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" class="form-control" v-model="nombre">
      </div>
      <button class="btn btn-primary" type="submit">Registrarse</button>
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
      contrasena: '',
      nombre: '',
      mensaje: ''
    };
  },
  methods: {
    async register() {
      if (!validator.isEmail(this.email)) {
        alert('El correo electrónico no es válido');
        return;
      }
      if (this.contrasena.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      const Usuario = {
        email: this.email,
        contrasena: this.contrasena,
        nombre: this.nombre
      };
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Usuario),
        });

        if (response.ok) {
          //muestra el mensaje de respuesta
          console.log('Usuario registrado');
          const data = await response.json();
          this.mensaje = data.mensaje;
          alert(data.mensaje);
        } else {
          // Maneja errores de respuesta
          const errorData = await response.json();
          console.error('Error en la solicitud:', errorData.error);
          this.mensaje = `Error: ${errorData.error}`;
          alert(`Error: ${errorData.error}`);
        }
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