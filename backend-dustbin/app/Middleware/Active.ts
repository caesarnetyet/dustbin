import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Active {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.authenticate()
    if (!user.is_active) {
      return response.unauthorized({ message: 'Debes verificar tu cuenta para continuar' })
    }
    await next()
  }
}
