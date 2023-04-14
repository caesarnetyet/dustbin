import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
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

    const signedUrl = Route.makeSignedUrl('activate', {
      user: user.id,
    }, {
      expiresIn: '1 day',
    })
    const url = `${Env.get('FRONTEND_URL')}/activate?signedUrl=${signedUrl}`
    await Mail.sendLater(message => {
      message
        .from('caesarnetyet@gmail.com')
        .to(user.email)
        .subject('verify your email to activate your account')
        .htmlView('email/register', { user, signedUrl, url })
    })

    const { token } = await auth.use('api').generate(user)
    return { user, token }
  }

  public async activate({ params, response, request }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.badRequest({ message: 'Invalid or expired url' })
    }
    const user = await User.findOrFail(params.user)
    user.is_active = true
    await user.save()
    return response.ok({ message: 'Cuenta activada satistactoriamente' })
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
