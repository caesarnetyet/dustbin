import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Sensor from './Sensor'

export default class Model extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public battery_included: boolean


  @manyToMany(() => Sensor, {
    pivotTable: 'model_sensors',
    pivotForeignKey: 'model_id',
    pivotRelatedForeignKey: 'sensor_id',
  })
  public sensors: ManyToMany<typeof Sensor>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
