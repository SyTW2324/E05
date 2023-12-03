<template>
  <div class="background">
    <div class="content-container">
      <div class="content-box">
        <h1>{{ nombreMazo }}</h1>
      </div>
      <div class="content-box">
        <div v-for="carta in cartas" :key="carta" class="deck-card">
          <h3 class="deck-name-button">{{ carta }}</h3>
        </div>
      </div>
      <div class="content-box">
        <div class="container mt-4">
          <div class="alert alert-info comment-container">
            <h3>Comentarios</h3>
            <div v-for="(comentario, index) in comentarios" :key="index" class="deck-card">
              <h3 class="deck-name-button">
                {{ usuarios[index] }}: {{ comentario }}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-4">
        <div class="alert alert-info">
          <form @submit.prevent="create">
            <div class="form-group">
              <label for="comentario">Añadir comentario:</label>
              <textarea v-model="comentario" class="form-control" id="comentario" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore, useDeckStore } from '@/store';

export default {
  data() {
    return {
      cartas: [],
      comentario: '',
      comentarios: [],
      usuarios: [],
    };
  },
  props: {
    nombreMazo: String,
  },
  mounted() {
    const authStore = useAuthStore();
    const email = authStore.email;
    const deckStore = useDeckStore()
    const mazos = deckStore.filteredDecks;
    for (let i = 0; i < mazos.length; i++) {
      if (mazos[i].titulo === this.nombreMazo) {
        const cartas = mazos[i].deck;
        this.comentarios = mazos[i].comentarios;
        this.usuarios = mazos[i].usuarios;
        for (let j = 0; j < cartas.length; j++) {
          this.cartas.push(cartas[j]);
        }
      }
    }
  },
  methods: {
    async create() {
      const authStore = useAuthStore();
      const deckStore = useDeckStore();
      const email = authStore.email;
      const mazo = this.nombreMazo;
      const comentario = this.comentario;
      const response = await deckStore.createComentario(comentario, email, mazo);
      if (response.success) {
        alert('Comentario añadido');
      } else {
        alert('Error al añadir comentario');
      }
    }
  },
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  max-width: 600px;
  text-align: center;
}

.background {
  background-image: url('https://images4.alphacoders.com/886/886168.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.comment-container {
  max-height: 200px; /* Ajusta la altura máxima según sea necesario */
  overflow-y: auto;
}
</style>
