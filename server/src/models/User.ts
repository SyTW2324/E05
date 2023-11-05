import mongoose, { Schema, Document } from 'mongoose';

// Define una interfaz IUser que extiende Document para especificar la estructura de un documento de usuario
interface IUser extends Document {
  nombre: string;
  email: string;
  contrasena: string;
}

// Define el esquema del usuario utilizando la clase Schema de Mongoose
const userSchema: Schema = new Schema({
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
export const User = mongoose.model<IUser>('User', userSchema);
