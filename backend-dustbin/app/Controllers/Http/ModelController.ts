import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Model from 'App/Models/Model'


export default class ModelController {
  public async createModel({ request }: HttpContextContract) {
    const newModelSchema = schema.create({
      name: schema.string(),
      price: schema.number(),
      sensors: schema.array().members(schema.number()),
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

    for (const sensor of payload.sensors) {
      await model.related('sensors').attach([sensor])
    }


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

  public async getModelSensors({ params }: HttpContextContract) {
    const dustbin = await Database.query().from('dustbins').where('dustbins.id', '=', params.id).first();
    const models = await Database.query().from('models')
      .innerJoin('model_sensors as senModel', 'senModel.model_id', '=', 'models.id')
      .innerJoin('sensors', 'sensors.id', '=', 'senModel.sensor_id');
    dustbin["sensors"] = models
    return dustbin
  }
}
