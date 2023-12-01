<template>
  <div class="background">
    <div class="content-box">
      <div class="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1>Mazo: {{ nombreMazo }}</h1>
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

    const deckStore = useDeckStore();
    deckStore.init(email);
    const mazos = deckStore.myDecks;
    
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
.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  margin: 0 auto;
}

.title {
  color: #f5f4fc;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.message {
  background-color: #E0FFFF;
  color: #000000;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.button {
  background-color: #2e86de;
  color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
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

.background {
  background-image: url('https://bnetcmsus-a.akamaihd.net/cms/gallery/ASW4ACCHGE991428977059569.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  margin-top: 0px;
  height: 100vh;
}
</style>