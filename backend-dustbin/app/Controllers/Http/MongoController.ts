import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws';
const connect = require('App/Controllers/Conection/MongoConecction')
const { SensorModel, DetailsModel } = require('App/Models/mongoModels')

export default class MongoController {
  public async getSensors({ }: HttpContextContract) {
    try {
      await connect();
      const sensorChangeStream = SensorModel.watch();
      sensorChangeStream.on('change', (change) => {
        console.log(change);
      });
      Ws.io.emit('sensor', JSON.stringify({ data: [await SensorModel.findOne({}).sort({ _id: -1 })] }));
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return [await SensorModel.findOne({}).sort({ _id: -1 })];
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
