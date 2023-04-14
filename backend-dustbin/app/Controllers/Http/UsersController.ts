import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
export default class UsersController {

  public async index({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return user
  }

  public async store({ request, auth }: HttpContextContract) {
    const storeSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string(),
      phone: schema.string(),
    })
    const payload = await request.validate({ schema: storeSchema })
    payload['roleId'] = 3
    const user = await User.create(payload)

    const { token } = await auth.use('api').generate(user)
    return { user, token }
  }

  public async login({ request, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({}, [
        rules.email()
      ]),
      password: schema.string(),
    })
    const payload = await request.validate({ schema: loginSchema })
    const { token } = await auth.use('api').attempt(payload.email, payload.password)
    return { token }
  }

  public async update({ request, auth }: HttpContextContract) {
    const updateSchema = schema.create({
      name: schema.string.optional(),
      email: schema.string.optional({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string.optional(),
      phone: schema.string.optional(),
    })
    const payload = await request.validate({ schema: updateSchema })
    const user = await auth.authenticate()
    user.merge(payload)
    await user.save()
    return user
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.delete()
    return { message: 'User deleted successfully' }
  }

}
