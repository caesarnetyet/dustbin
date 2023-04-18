import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Model_Sensor from 'App/Models/Model_Sensor'

export default class ModelSensorController {
  public async createModelSensor({ request }: HttpContextContract) {
    const newModelSensorSchema = schema.create({
      model_id: schema.number(),
      sensor_id: schema.number(),
    })
    const payload = await request.validate({ schema: newModelSensorSchema })
    if (!payload) {
      return { message: 'Error al guardar el modelo' }
    }
    const model = new Model_Sensor()
    model.model_id = payload.model_id
    model.sensor_id = payload.sensor_id
    await model.save()
    return model
  }

  public async getModelSensors({ request }: HttpContextContract) {
    const models = await Model_Sensor.all()
    return models
  }

  public async updateModelSensor({ request }: HttpContextContract) {
    const updateModelSensorSchema = schema.create({
      model_id: schema.number(),
      sensor_id: schema.number(),
    })
    const payload = await request.validate({ schema: updateModelSensorSchema })
    if (!payload) {
      return { message: 'Error al actualizar el modelo' }
    }
    const findModel = await Model_Sensor.find(request.params().id)
    if (!findModel) {
      return { message: 'No se encontró el modelo' }
    }
    findModel.model_id = payload.model_id
    findModel.sensor_id = payload.sensor_id
    await findModel.save()
    return findModel
  }

  public async deleteModelSensor({ request }: HttpContextContract) {
    const findModel = await Model_Sensor.find(request.params().id)
    if (!findModel) {
      return { message: 'No se encontró el modelo' }
    }
    await findModel.delete()
    return { message: 'Modelo eliminado' }
  }
}
