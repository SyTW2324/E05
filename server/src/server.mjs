import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
// Configura rutas y controladores aquí

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Esta es la página de inicio del servidor');
});