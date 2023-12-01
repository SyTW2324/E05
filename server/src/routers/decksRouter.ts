import {Deck} from '../models/Deck';
import express from 'express';
export const decksRouter = express.Router();

// Crea un nuevo deck
decksRouter.post('/decks', async (req, res) => {
  try {
    const { email, titulo, deck, comentarios, usuarios } = req.body;
    if (!email || !titulo || !deck) {
      res.status(400).json({ error: 'Faltan datos' });
    } else {
      if (await Deck.exists({ titulo })) {
        res.status(400).json({ error: 'El deck ya existe' });
        return;
      }
      const deck1 = new Deck({ email, titulo, deck, comentarios, usuarios });
      await deck1.save();
      res.status(201).json({ mensaje: 'Deck creado con éxito', deck: deck1});
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir un comentario a un deck
decksRouter.post('/decks/add', async (req, res) => {
  try {
    const {titulo, comentario, usuario} = req.body;
    if (!titulo || !comentario || !usuario) {
      res.status(400).json({ error: 'Faltan datos' });
    } else {
      const deck = await Deck.findOne({titulo});
      if (!deck) {
        res.status(400).json({ error: 'El deck no existe' });
        return;
      }
      deck.comentarios.push(comentario);
      deck.usuarios.push(usuario);
      await deck.save();
      res.status(201).json({ mensaje: 'Comentario añadido con éxito', comentario: comentario});
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener los decks de un usuario
decksRouter.get('/decks/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const decks = await Deck.find({email});
    res.json(decks);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un deck con un título
decksRouter.get('/decks/:titulo', async (req, res) => {
  try {
    const titulo = req.params.titulo;
    const deck = await Deck.findOne({titulo});
    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los decks
decksRouter.get('/decks', async (req, res) => {
  try {
    const decks = await Deck.find();
    res.json(decks);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener mazos por un filtro dado
decksRouter.get('/decks/filtro/:filtro', async (req, res) => {
  try {
    const filtro = req.params.filtro;
    const decks = await Deck.find({titulo: {$regex: filtro}});
    res.json(decks);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});
