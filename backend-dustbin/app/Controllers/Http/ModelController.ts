import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Model from 'App/Models/Model'
import { model } from 'mongoose'
import Model_Sensor from 'App/Models/Model_Sensor'
import Sensor from 'App/Models/Sensor'

export default class ModelController {
  public async createModel({ request }: HttpContextContract) {
    const newModelSchema = schema.create({
      name: schema.string(),
      price: schema.number(),
      battery_included: schema.boolean(),
    })
    const payload = await request.validate({ schema: newModelSchema })
    if (!payload) {
      return { message: 'Error al guardar el modelo' }
    }
    const model = new Model()
    model.name = payload.name
    model.price = payload.price
    model.battery_included = payload.battery_included
    await model.save()
    return model
  }

  public async getModels({ }: HttpContextContract) {
    const models = await Model.all()
    return models
  }

  public async updateModel({ request }: HttpContextContract) {
    const updateModelSchema = schema.create({
      name: schema.string(),
      price: schema.number(),
      battery_included: schema.boolean(),
    })
    const payload = await request.validate({ schema: updateModelSchema })
    if (!payload) {
      return { message: 'Error al actualizar el modelo' }
    }
    const findModel = await Model.find(request.params().id)
    if (!findModel) {
      return { message: 'No se encontró el modelo' }
    }
    findModel.name = payload.name
    findModel.price = payload.price
    findModel.battery_included = payload.battery_included
    await findModel.save()
    return findModel
  }

  public async deleteModel({ request }: HttpContextContract) {
    const findModel = await Model.find(request.params().id)
    if (!findModel) {
      return { message: 'No se encontró el modelo' }
    }
    await findModel.delete()
    return { message: 'Modelo eliminado' }
  }

  public async getModelSensors({ }: HttpContextContract) {
    const models = await Database.query().select('*').from('models');
    const modelSensors = await Model_Sensor.query().whereIn('model_id', models.map(model => model.id));
    const sensors = await Sensor.query().whereIn('id', modelSensors.map(modelSensor => modelSensor.sensor_id));

    // Mapea los modelos y agrega los sensores como una propiedad
    const modelsWithSensors = models.map(model => {
      // Filtra los model_sensors correspondientes al modelo actual
      const modelSensorsForModel = modelSensors.filter(modelSensor => modelSensor.model_id === model.id);
      // Filtra los sensores correspondientes a los model_sensors del modelo actual
      const sensorsForModel = sensors.filter(sensor => modelSensorsForModel.some(modelSensor => modelSensor.sensor_id === sensor.id));
      // Agrega los sensores como una propiedad en el modelo
      model.sensors = sensorsForModel;
      return model;
    });

    // Retorna la respuesta en formato JSON
    const response = JSON.stringify(modelsWithSensors);
    return response;
  }
}
