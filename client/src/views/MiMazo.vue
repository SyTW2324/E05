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
    </div>
  </div>
</template>

<script>
import { useAuthStore, useDeckStore } from '@/store';

export default {
  data() {
    return {
      cartas: [],
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
        for (let j = 0; j < cartas.length; j++) {
          console.log(cartas[j]);
          this.cartas.push(cartas[j]);
        }
      }
    }
  },
};
</script>

<style scoped>
body, html {
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
