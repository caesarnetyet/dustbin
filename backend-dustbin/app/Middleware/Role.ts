import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, roles: string[]) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.authenticate()
    if (!roles.includes(user.role.name)) {
      return response.unauthorized({ message: 'No estas autorizado para acceder' })
    }

    await next()
  }
}
