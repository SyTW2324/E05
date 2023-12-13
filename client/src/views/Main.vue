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
              <router-link to="/SubirDeck" class="action-button">Añadir un deck</router-link>
            </div>
            <p><br>
              O busca un deck que te guste y pruébalo.
            </p>
            <div class="button-container">
              <router-link to="/Filtrar" class="action-button">Buscar un deck</router-link>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="column-text">
            <p>Echa un vistazo a tus mazos:</p>
            <div v-if="myDecks.length === 0">
              <p>No tienes mazos todavía. ¡Crea uno!</p>
            </div>
            <div v-else>
              <div v-for="deck in myDecks" :key="deck.titulo" class="deck-card">
                <router-link :to="{ path: '/MiMazo', query: { nombreMazo: deck.titulo } }">
                  <h3 class="deck-name-button">{{ deck.titulo }}</h3>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore, useDeckStore } from '@/store';

export default {
  data() {
    return {
      nombreUsuario: '',
      myDecks: [] as any[],
    };
  },
  async mounted() {
    await this.loadUserData();
  },
  methods: {
    async loadUserData() {
      const authStore = useAuthStore();
      const deckStore = useDeckStore();

      const email = authStore.email;
      this.nombreUsuario = authStore.nombreUsuario;

      await deckStore.init(email);
      this.myDecks = deckStore.myDecks;
    },
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