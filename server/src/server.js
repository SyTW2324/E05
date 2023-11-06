"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require('cors');
var connectToDatabase = require('./db.js').connectToDatabase;
var usuariosRouter_js_1 = require("./routers/usuariosRouter.js");
var express = require('express');
var app = express();
var port = 3000;
app.use(express.json());
app.use(cors({ origin: '*' }));
// Llama a la función para conectar a la base de datos
connectToDatabase()
    .then(function () { return console.log('Conectado a la base de datos'); })
    .catch(function (error) { return console.error(error); });
app.use(usuariosRouter_js_1.usuariosRouter);
app.get('/', function (req, res) {
    res.send('Esta es la página de inicio de usuarios');
});
app.listen(port, function () {
    console.log("Servidor escuchando en http://localhost:".concat(port));
});
