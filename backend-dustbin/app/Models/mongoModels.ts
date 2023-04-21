// const mongo = require('mongoose');
// const { Schema } = mongo;
// //import Ws from "App/Services/Ws";

// const mongoSensorSchema = new Schema({
//   tipo: String,
//   valor: Number,
//   id_sensor: Number,
// });

// const SensorModel = mongo.model('sensors', mongoSensorSchema);


// // Definición del esquema de la colección 'details'
// const mongoDetailsSchema = new Schema({
//   id_sensor: Number,
//   pin_in: String,
//   pin_out: String,
//   description: String
// });

// const DetailsModel = mongo.model('details', mongoDetailsSchema);



// module.exports = { SensorModel, DetailsModel };
// // Configurar watch en los modelos
// SensorModel.watch().on('insert', (change) => {
//   console.log('Nueva inserción:', change);
//   console.log('Nueva inserción:');
// });
