<template>
  <div class="background">
    <div class="content-container">
      <div class="content-box">
        <h1>Buscar</h1>
      </div>
      <div class="content-box">
        <h2>Buscar por nombre</h2>
        <input type="text" v-model="nombre" />
        <button @click="getDecks">Buscar</button>
      </div>
      <div class="content-box">
      <div v-if="decks.length === 0">
        <p>No hay mazos que coincidan con la búsqueda.</p>
      </div>
      <div v-else>
        <div v-for="deck in decks" :key="deck.titulo" class="deck-card">
          <router-link :to="{ path: '/MiMazo', query: { nombreMazo: deck.titulo } }">
            <h3 class="deck-name-button">{{ deck.titulo }}</h3>
          </router-link>
        </div>
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
      decks: [],
      nombre: ''
    };
  },
  mounted() {
    const deckStore = useDeckStore();
    this.decks = deckStore.getFilterDecks;
  },
  methods: {
    async getDecks() {
      try {
        const authStore = useAuthStore();
        const deckStore = useDeckStore();
        const mazos = deckStore.getFilterDecks;
        const mazos_filtrados = mazos.filter((mazo) => mazo.titulo.toLowerCase().includes(this.nombre.toLowerCase()));
        this.decks = mazos_filtrados;
      }catch (error) {
        console.log(error);
      }
    } 
  }
}

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
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
