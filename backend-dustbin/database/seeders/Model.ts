import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Model from 'App/Models/Model'


export default class extends BaseSeeder {
  public async run() {
    const models = [
      {
        name: 'Dustbin', price: 1800, battery_included: true,
      }]
      await Model.createMany(models)
  }
}
