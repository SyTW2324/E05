<template>
  <div class="main-page">
    <div class="background">
      <div class="content-box">
        <h1>Bienvenido {{ nombreUsuario }}</h1>
      </div>
      <div class="columns-container">
        <div class="column">
          <div class="column-text">
            <p>
              Cada día hay mazos nuevos por la comunidad. <br>
              ¡Se uno de ellos y crea tu mazo!
            </p>
            <div class="button-container">
              <router-link to="/add-deck" class="action-button">Añadir un deck</router-link>
            </div>
            <p><br>
              O busca un deck que te guste y pruébalo.
            </p>
            <div class="button-container">
              <router-link to="/search-deck" class="action-button">Buscar un deck</router-link>
            </div>
          </div>
        </div>
        <div class="column">
          <p class="column-text">Echa un vistazo a tus mazos:</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/store';

export default {
  data() {
    return {
      nombreUsuario: '',
    };
  },
  mounted () {
    const authStore = useAuthStore();
    this.nombreUsuario = authStore.nombreUsuario;
  },
};
</script>

<style scoped>

.columns-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.column {
  width: 45%;
}

.column-text {
  background-color: #ffffff;
  color: #000000;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}

.button-container {
  margin-top: 20px;
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
</style>

