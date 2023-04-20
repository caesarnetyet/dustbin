import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sensor from 'App/Models/Sensor'

export default class extends BaseSeeder {
  public async run () {
    const sensors = [
      { name: 'Luz', type: 'light', description: ' El sensor de luz 1'},
      { name: 'Humo', type: 'smoke', description: 'El sensor de humo 1'},
      { name: 'Inclinacion', type: 'inclination', description: 'El sensor de inclinacion 1'},
      { name: 'Ultrasonico', type: 'Ultrasonic', description: 'El sensor de ultrasonico 1'},
      { name: 'Golpe', type: 'Bang', description: 'El sensor de golpe 1'},
      { name: 'Temperatura', type: 'temperature', description: 'El sensor de temperatura 1'},
    ]
    // Write your database queries inside the run method
    await Sensor.createMany(sensors)
  }
}
