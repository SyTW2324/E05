import { defineStore, createPinia } from 'pinia';
import axios from 'axios';

export const pinia = createPinia();

interface Usuario {
  email: string;
  contrasena: string;
  nombre: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    token: '',
    nombreUsuario: '',
    email: '',
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    setAuthData(token: string, nombreUsuario: string, email: string) {
      this.token = token;
      this.nombreUsuario = nombreUsuario;
      this.email = email;
      this.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    clearAuthData() {
      this.token = '';
      this.nombreUsuario = '';
      this.email = '';
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    async login(email: string, contrasena: string) {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/login', {
          email,
          contrasena,
        });

        const token = response.data.token;
        const nombreUsuario = response.data.nombre;
        const email1 = response.data.email;

        this.setAuthData(token, nombreUsuario, email1);
        return { success: true, message: 'Inicio de sesión exitoso' };
      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.clearAuthData();
        localStorage.removeItem('token');

        return { success: false, message: 'Error en la solicitud' };
      }
    },
    async registerUsuario(usuario: Usuario) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });
        if (response.ok) {
          const data = await response.json();
          // Almacenar el token
          const token = data.token;
          this.setAuthData(token, usuario.nombre, usuario.email);
          return { success: true, message: data.mensaje };
        } else {
          // Maneja errores de respuesta
          const errorData = await response.json();
          console.error('Error en la solicitud:', errorData.error);
          return { success: false, message: `Error: ${errorData.error}` };
        }
      } catch (error) {
        // Maneja errores de red o de solicitud
        console.error('Error en la solicitud:', error);
        return { success: false, message: 'Error en la solicitud' };
      }
    },
    logout() {
      this.clearAuthData();
      localStorage.removeItem('token');
    },
  },
});

export interface Deck {
  email: string;
  titulo: string;
  deck: string[];
  comentarios: string[];
  usuarios: string[];
}

export const useDeckStore= defineStore({
  id: 'deck',
  state: () => ({
    filteredDecks : [] as Deck[],
    myDecks: [] as Deck[],
  }),
  getters: {
    getMyDecks: (state) => state.myDecks,
    getFilteredDecks: (state) => state.filteredDecks,
  },
  actions: {
    async init(email: string) {
      await this.loadMyDecks(email);
    },
    async loadMyDecks(email: string) {
      try {
        const response = await axios.get(`http://localhost:3000/decks/${email}`);
        const decks: Deck[] = response.data;
        this.myDecks = decks;
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    },
    async createDeck(deckData: Deck) {
      try {
        const response = await fetch('http://localhost:3000/decks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: deckData.email,
            titulo: deckData.titulo,
            deck: deckData.deck,
            comentarios: deckData.comentarios,
            usuarios: deckData.usuarios,
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          const deck: Deck = data.deck;
          const mensaje = data.mensaje;
    
          this.loadMyDecks(deckData.email);
          this.myDecks.push(deck);
    
          return { success: true, message: mensaje };
        } else {
          const errorData = await response.json();
          console.error('Error en la solicitud:', errorData.error);
          return { success: false, message: `Error: ${errorData.error}` };
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        return { success: false, message: 'Error en la solicitud' };
      }
    },
  }
});
