<script lang="ts">
import { useAuthStore } from '../store';
import validator from 'validator';

export default {
  data() {
    return {
      email: '',
      contrasena: '',
      nombre: '',
      mensaje: '',
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
        nombre: this.nombre,
      };
      
      const authStore = useAuthStore();
      const { success, message } = await authStore.registerUsuario(Usuario);

      if (success) {
        this.mensaje = message;
        alert(message);
        this.$router.push('/main');
      } else {
        this.mensaje = message;
        alert(message);
      }
    },
  },
};
</script>

<template>
  <div class="background">
    <div class="content-box">
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
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo blanco semi-transparente */
  border: 1px solid #ccc;
  /* Borde gris */
  border-radius: 10px;
  /* Borde redondeado */
  padding: 20px;
  text-align: center;
}

</style>

