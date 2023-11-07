import mongoose, { Schema, Document } from 'mongoose';

// Define una interfaz IDeck que extiende Document para especificar la estructura de un documento de usuario
interface IDeck extends Document {
  nombre: string;
  titulo: string;
  deck: string[];
}

// Define el esquema del usuario utilizando la clase Schema de Mongoose
const DeckSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
    unique: true,
  },
  //deck es una rray de strings de 10 elementos
  deck: {
    type: [String],
    required: true,
    unique: false,
  },
});

// Crea un modelo de datos "Deck" basado en el esquema "DeckSchema" y la interfaz "IDeck"
export const Deck = mongoose.model<IDeck>('Deck', DeckSchema);