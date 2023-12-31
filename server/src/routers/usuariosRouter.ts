import { User } from './../models/User';
import jwt from 'jsonwebtoken';
import express from 'express';
export const usuariosRouter = express.Router();

// Crea un nuevo usuario
usuariosRouter.post('/usuarios', async (req, res) => {
  try {
    const { email, contrasena, nombre } = req.body;
    if (!nombre || !email || !contrasena) {
      res.status(400).json({ error: 'Faltan datos' });
    } else {
      if (await User.exists({ email })) {
        res.status(400).json({ error: 'El usuario ya existe' });
        return;
      }
      const usuario = new User({ nombre, email, contrasena });
      await usuario.save();
      const token = jwt.sign({ nombre, email}, 'secreto', {
        expiresIn: '1h',
      });
      res.status(201).json({ mensaje: 'Usuario creado con éxito', token: token, nombre: nombre, email: email});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar sesión
usuariosRouter.post('/usuarios/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario || usuario.contrasena !== contrasena) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    } 
    const nombre = usuario.nombre;
    const token = jwt.sign({nombre , email}, 'secreto', {
      expiresIn: '1h',
    });
    res.json({ mensaje: 'Inicio de sesión exitoso', token: token, nombre: nombre, email: email});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

