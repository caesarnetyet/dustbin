import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdminsController {
  public async createUser({ request }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({}, [
        rules.confirmed(),
      ]),
      phone: schema.string(),
    })
    const payload = await request.validate({ schema: newUserSchema })
    if(!payload){
      return {message: 'Error al guardar el usuario'}
    }
    const user = new User()
    user.name = payload.name
    user.email = payload.email
    user.password = payload.password
    user.phone = payload.phone
    user.is_active = true
    user.roleId = 2
    await user.save()
    return user
  }

  public async getUsers({ request }: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async updateUser({ request }: HttpContextContract) {
    const updateUserSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
      phone: schema.string(),
    })
    const payload = await request.validate({ schema: updateUserSchema })
    if(!payload){
      return {message: 'Error al actualizar el usuario'}
    }
    const findUser = await User.find(request.params().id)
    if(!findUser){
      return {message: 'No se encontró el usuario'}
    }
    findUser.name = payload.name
    findUser.email = payload.email
    findUser.password = payload.password
    findUser.phone = payload.phone
    await findUser.save()
    return findUser
  }

  public async deleteUser({ request }: HttpContextContract) {
    const findUser = await User.find(request.params().id)
    if(!findUser){
      return {message: 'No se encontró el usuario'}
    }
    await findUser.delete()
    return {message: 'Usuario eliminado'}
  }
}
