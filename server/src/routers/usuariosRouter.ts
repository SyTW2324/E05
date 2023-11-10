import { User } from './../models/User';
import express from 'express';
export const usuariosRouter = express.Router();

usuariosRouter.post('/usuarios', async (req, res) => {
  try {
    const { email, contrasena, nombre } = req.body; // Cambia "contrasena" a "password"
    if (!nombre || !email || !contrasena) {
      res.status(400).json({ error: 'Faltan datos' });
    } else {
      if (await User.exists({ email })) {
        res.status(400).json({ error: 'El usuario ya existe' });
        return;
      }
      const usuario = new User({ nombre, email, contrasena });
      await usuario.save();
      res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


