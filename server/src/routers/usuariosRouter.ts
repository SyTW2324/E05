import { User } from './../models/User';
import jwt from 'jsonwebtoken';
import express from 'express';
import { truncateSync } from 'fs';
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
      const token = jwt.sign({ nombre: usuario.nombre, email: usuario.email }, 'secreto', {
        expiresIn: '1h',
      });
      res.status(201).json({ mensaje: 'Usuario creado con éxito', token, nombre: usuario.nombre, email: usuario.email });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usuariosRouter.post('/usuarios/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario || usuario.contrasena !== contrasena) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign({ nombre: usuario.nombre, email: usuario.email }, 'secreto', {
      expiresIn: '1h',
    });
    
    res.json({ mensaje: 'Inicio de sesión exitoso', token, nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usuariosRouter.get('/usuarios', async (req, res) => {
  try{
    //a traves del token se puede obtener el usuario
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, 'secreto');
    const decodednombre = decoded.nombre;
    res.json({decodednombre});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});

