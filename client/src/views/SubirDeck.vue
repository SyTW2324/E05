<script lang="ts">
import { useAuthStore, useDeckStore } from '../store';

export default {
  data() {
    return {
      nombreDeck: '',
      cartas: Array(10).fill(''),
      mensaje: '',
    };
  },
  methods: {
    async create() {
      // Validación del nombre del deck
      if (this.nombreDeck.trim() === '') {
        alert('Por favor, ingresa el nombre del deck');
        return;
      }

      // Validación de los cartas
      for (const carta of this.cartas) {
        if (carta.trim() === '') {
          alert('Por favor, ingresa todas las cartas del deck');
          return;
        }
      }

      const authStore = useAuthStore();
      const email = authStore.email;

      const Deck = {
        email: email,
        titulo : this.nombreDeck,
        deck: this.cartas,
        comentarios: [],
        usuarios: [],
      };
      
      const deckStore = useDeckStore();
      const { success, message } = await deckStore.createDeck(Deck);

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
        <h1>Subir un deck</h1>
        <form @submit.prevent="create">
          <div class="form-group">
            <label for="nombreDeck">Nombre del Deck</label>
            <input type="text" id="nombreDeck" class="form-control" v-model="nombreDeck" placeholder="Nombre Deck">
          </div>
          <br>
          <div v-for="(carta, index) in cartas" :key="index" class="form-group">
            <input :type="'text'" :id="'carta' + index" class="form-control" v-model="cartas[index]" placeholder="Nombre Carta">
          </div>
          <button class="btn btn-primary" type="submit">Subir</button>
        </form>
        <p>{{ mensaje }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url('https://wallpapercave.com/dwp1x/wp1843549.png');
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