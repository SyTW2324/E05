const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Conexión a la base de datos MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error);
  }
}

module.exports = { connectToDatabase };

