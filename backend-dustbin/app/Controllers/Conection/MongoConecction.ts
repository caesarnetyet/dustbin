const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@cluster0.urq1yx8.mongodb.net/Prueba?retryWrites=true&w=majority"
// Función para establecer la conexión a MongoDB
const connect = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};

module.exports = connect;
