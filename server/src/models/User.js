"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
// Define el esquema del usuario utilizando la clase Schema de Mongoose
var userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contrasena: {
        type: String,
        required: true,
    },
});
// Crea un modelo de datos "User" basado en el esquema "userSchema" y la interfaz "IUser"
exports.User = mongoose_1.default.model('User', userSchema);
