import request from 'supertest';
import { app} from '../src/server';
import { expect } from 'chai';
import { Deck } from '../src/models/Deck';

describe('Decks API', () => {
  // Almacena el ID del deck creado para limpiarlo al final de las pruebas
  let createdDeckId;

  describe('POST /decks', () => {
    it('Crea un nuevo deck correctamente', async () => {
      await Deck.deleteOne({titulo: 'Nuevo Deck'})
      const response = await request(app)
        .post('/decks')
        .send({
          email: 'test@example.com',
          titulo: 'Nuevo Deck',
          deck: 'Contenido del Deck',
          comentarios: [],
          usuarios: [],
        })
        .expect(201);

      const deck = await Deck.findById(response.body.deck._id);
      createdDeckId = response.body.deck._id; // Almacena el ID del deck creado
      expect(deck).to.not.be.null;
      expect(deck.titulo).to.equal('Nuevo Deck');
    });

    it('Retorna un error si faltan datos', async () => {
      await request(app)
        .post('/decks')
        .send({ titulo: 'Nuevo Deck', deck: 'Contenido del Deck' })
        .expect(400);
    });
  });

  describe('POST /decks/add', () => {
    it('Añade un comentario a un deck existente', async () => {
      const response = await request(app)
        .post('/decks/add')
        .send({
          titulo: 'Nuevo Deck',
          comentario: 'Nuevo Comentario',
          usuario: 'Nuevo Usuario',
        })
        .expect(201);

      const deck = await Deck.findOne({ titulo: 'Nuevo Deck' });
      expect(deck).to.not.be.null;
      expect(deck.comentarios).to.include('Nuevo Comentario');
      expect(deck.usuarios).to.include('Nuevo Usuario');
    });

    it('Retorna un error si faltan datos', async () => {
      await request(app)
        .post('/decks/add')
        .send({ titulo: 'Nuevo Deck', comentario: 'Nuevo Comentario' })
        .expect(400);
    });

    it('Retorna un error si el deck no existe', async () => {
      await request(app)
        .post('/decks/add')
        .send({
          titulo: 'DeckInexistente',
          comentario: 'Nuevo Comentario',
          usuario: 'Nuevo Usuario',
        })
        .expect(400);
    });
  });

  describe('GET /decks/:email', () => {
    it('Obtiene los decks de un usuario', async () => {
      const response = await request(app).get('/decks/test@example.com').expect(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /decks', () => {
    it('Obtiene todos los decks', async () => {
      const response = await request(app).get('/decks').expect(200);
      expect(response.body).to.be.an('array');
    });
  });

  // Limpiar el deck creado al final de las pruebas
  after(async () => {
    await Deck.deleteOne({titulo: 'Nuevo Deck'});
    process.exit(0);
  });
});
