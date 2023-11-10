import cors from 'cors';
import { connectToDatabase } from './db';
import {usuariosRouter } from './routers/usuariosRouter';
import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

// Llama a la función para conectar a la base de datos
connectToDatabase()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(error => console.error(error));

app.use(usuariosRouter);

app.get('/', (req, res) => {
  res.send('Esta es la página de inicio de usuarios');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
