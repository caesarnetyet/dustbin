import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Ws from 'App/Services/Ws';
//const { SensorModel, DetailsModel } = require('App/Models/mongoModels')
const client = require('App/Controllers/Conection/MongoConecction')
const dbName = 'Prueba';
export default class MongoController {
  public async getSensors({ }: HttpContextContract) {
    try {
      await client.connect();
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const db = client.db(dbName);
      const collection = db.collection('sensors');
      const findResult = await collection.find({}).toArray();
      return findResult;
    } catch (error) {

    }
  }
}
