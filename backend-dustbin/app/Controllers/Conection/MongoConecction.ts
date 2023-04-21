const mongoose = require('mongoose');
const uri = "mongodb://206.189.229.90:30001/mydb"
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
