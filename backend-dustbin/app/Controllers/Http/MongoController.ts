import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws';
const connect = require('App/Controllers/Conection/MongoConecction')
const { SensorModel, DetailsModel } = require('App/Models/mongoModels')

export default class MongoController {
  public async getSensors({ }: HttpContextContract) {
    try {
      await connect();

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const data = [await SensorModel.findOne({}).sort({ _id: -1 })];
      Ws.io.emit('Humo', JSON.stringify({ data }));
      return data;
    } catch (error) {
      console.log(error);
      return { message: 'Error' };
    }
  }

  public async getDetails({ }: HttpContextContract) {
    try {
      await connect();
      const detailsChangeStream = DetailsModel.watch();
      detailsChangeStream.on('change', (change) => {
        console.log(change);
      });
      Ws.io.emit('details', JSON.stringify({ data: [await DetailsModel.findOne({}).sort({ _id: -1 })] }));
      return [await DetailsModel.findOne({}).sort({ _id: -1 })];
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.log(error);
      return { message: 'Error' };
    }
  }
}
