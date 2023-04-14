import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const admin = await Role.findByOrFail('name', 'admin')

    await admin.related('users').create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'adminadmin',
      phone: '123456789',
      is_active: true
    })
  }
}
