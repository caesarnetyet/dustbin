import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Dustbin from 'App/Models/Dustbin'
import Model from 'App/Models/Model'
import User from 'App/Models/User'

export default class DustbinController {
  public async createDustbin({ request }: HttpContextContract) {
    const newDustbinSchema = schema.create({
      name: schema.string(),
      model_id: schema.number(),
      user_id: schema.number(),
    })
    if (!request.input('model_id')) {
      return { message: 'Error al guardar el modelo' }
    }
    const payload = await request.validate({ schema: newDustbinSchema })
    if (!payload) {
      return { message: 'Error al guardar el modelo' }
    }
    const findModel = await Model.find(request.input('model_id'))
    if (!findModel) {
      return { message: 'Modelo no disponible' }
    }
    const findUser = await User.find(request.input('user_id'))
    if (!findUser) {
      return { message: 'Usuario no diponible' }
    }
    const dustbin = new Dustbin()
    dustbin.name = payload.name
    dustbin.model_id = payload.model_id
    dustbin.user_id = payload.user_id
    await dustbin.save()
    return dustbin
  }

  public async getDustbins({ request }: HttpContextContract) {
    const dustbins = await Dustbin
    .query()
    .from('dustbins')
    .select('dustbins.id', 'dustbins.name', 'dustbins.model_id', 'dustbins.user_id as Usuario', 'models.name as model_name', 'users.name as user_name')
    .join('models', 'dustbins.model_id', 'models.id')
    .join('users', 'dustbins.user_id', 'users.id')
    return dustbins
  }

  public async updateDustbin({ request }: HttpContextContract) {
    const updateDustbinSchema = schema.create({
      name: schema.string(),
      model_id: schema.number(),
      user_id: schema.number(),
    })
    const payload = await request.validate({ schema: updateDustbinSchema })
    if (!payload) {
      return { message: 'Error al actualizar el modelo' }
    }
    const findDustbin = await Dustbin.find(request.params().id)
    if (!findDustbin) {
      return { message: 'No se encontró el Carrito' }
    }
    findDustbin.name = payload.name
    findDustbin.model_id = payload.model_id
    findDustbin.user_id = payload.user_id
    await findDustbin.save()
    return findDustbin
  }

  public async deleteDustbin({ request }: HttpContextContract) {
    const findDustbin = await Dustbin.find(request.params().id)
    if (!findDustbin) {
      return { message: 'No se encontró el modelo' }
    }
    await findDustbin.delete()
    return { message: 'Modelo eliminado' }
  }

}
