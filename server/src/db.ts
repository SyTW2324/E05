import mongoose, { ConnectOptions } from 'mongoose';

// URL de conexión a la base de datos
const dbURL = 'mongodb+srv://admin:admin@cluster0.lbnkii3.mongodb.net/?retryWrites=true&w=majority';

// Función para conectar a la base de datos
export async function connectToDatabase() {
  try {
    await mongoose.connect(dbURL);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
