const express = require('express');
const cors = require('cors');
import {User} from './models/User.js';
import { connectToDatabase } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));
// Configura rutas y controladores aquí

/**connectToDatabase()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(error => console.error(error));*/

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Esta es la página de inicio del servidor');
});

app.post('/usuarios', async (req, res) => {
  try {
    const {nombre, email, contrasena} = req.body;
    if(!nombre || !email || !contrasena){
      res.status(400).json({error: 'Faltan datos'});
    }
    const usuarioExiste = await User.findOne({email});
    if(usuarioExiste){
      res.status(400).json({error: 'El usuario ya existe'});
    }
    const usuario = new User({nombre, email, contrasena});
    await usuario.save();
    res.status(201).json({mensaje: 'Usuario creado con éxito'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default app;