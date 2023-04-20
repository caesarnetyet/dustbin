import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const connect = require('App/Controllers/Conection/MongoConecction')
const {SensorModel, DetailsModel} = require('App/Models/mongoModels')

export default class MongoController {
  public async getSensors({  }: HttpContextContract) {
    try {
      await connect();
      const result = await SensorModel.find({});
      console.log(result);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return { message: 'Conectado', data: result };
    } catch (error) {
      console.log(error);
      return { message: 'Error' };
    }
  }
}
