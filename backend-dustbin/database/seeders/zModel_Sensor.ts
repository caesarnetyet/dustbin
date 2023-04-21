import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Model_Sensor from 'App/Models/Model_Sensor'

export default class extends BaseSeeder {
  public async run() {
    const model_sensors = [
      {model_id: 1, sensor_id: 1},
      {model_id: 1, sensor_id: 2},
      {model_id: 1, sensor_id: 3},
      {model_id: 1, sensor_id: 4},
      {model_id: 1, sensor_id: 5},
      {model_id: 1, sensor_id: 6},
    ]
    await Model_Sensor.createMany(model_sensors)
  }
}
