import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Model from 'App/Models/Model'

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

  public async getModels({ request }: HttpContextContract) {
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
}
