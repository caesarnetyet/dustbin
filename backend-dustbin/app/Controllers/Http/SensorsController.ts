import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Sensor from 'App/Models/Sensor'

export default class SensorsController {

  public async saveSensor({ request }: HttpContextContract) {
    const newSensorSchema = schema.create({
      name: schema.string(),
      type: schema.string(),
      description: schema.string(),
    })
    const payload = await request.validate({ schema: newSensorSchema })

    if(!payload){
      return {message: 'Error al guardar el sensor'}
    }
    const sensor = new Sensor()
    sensor.name = payload.name
    sensor.type = payload.type
    sensor.description = payload.description
    await sensor.save()
    return sensor
  }

  public async getSensors({  }: HttpContextContract) {
    const sensors = await Sensor.all()
    return sensors
  }

  public async updateSensor({ request }: HttpContextContract) {
    const updateSensorSchema = schema.create({
      name: schema.string(),
      type: schema.string(),
      description: schema.string(),
    })
    const payload = await request.validate({ schema: updateSensorSchema })

    if(!payload){
      return {message: 'Error al actualizar el sensor'}
    }

    const findSensor = await Sensor.find(request.params().id)
    if(!findSensor){
      return {message: 'No se encontró el sensor'}
    }
    findSensor.name = payload.name
    findSensor.type = payload.type
    findSensor.description = payload.description
    await findSensor.save()
    return findSensor
  }

  public async deleteSensor({ request }: HttpContextContract) {
    const findSensor = await Sensor.find(request.params().id)
    if(!findSensor){
      return {message: 'No se encontró el sensor'}
    }
    await findSensor.delete()
    return {message: 'Sensor eliminado'}
  }

}
