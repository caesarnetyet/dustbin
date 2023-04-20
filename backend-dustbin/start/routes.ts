/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'UsersController.index').middleware(['auth', 'active'])
  Route.post('/', 'UsersController.store')
  Route.get('/activate/:user', 'UsersController.activate').as('activate')
  Route.post('/login', 'UsersController.login')
  Route.put('/', 'UsersController.update').middleware('auth')
  Route.delete('/', 'UsersController.destroy').middleware('auth')
}).prefix('user')

Route.group(() => {
  Route.post('/create', 'SensorsController.saveSensor')
  Route.get('/getAll', 'SensorsController.getSensors')
  Route.put('/update/:id', 'SensorsController.updateSensor')
  Route.delete('/delete/:id', 'SensorsController.deleteSensor')
}).prefix('sensor')

Route.group(() => {
  Route.post('/create', 'AdminsController.createUser')
  Route.get('/getAll', 'AdminsController.getUsers')
  Route.put('/update/:id', 'AdminsController.updateUser')
  Route.delete('/delete/:id', 'AdminsController.deleteUser')
}).prefix('user')

Route.group(() => {
  Route.post('/create', 'ModelController.createModel')
  Route.get('/getAll', 'ModelController.getModels')
  Route.put('/update/:id', 'ModelController.updateModel')
  Route.delete('/delete/:id', 'ModelController.deleteModel')
}).prefix('model')

Route.group(() => {
  Route.post('/create', 'DustbinController.createDustbin')
  Route.get('/getAll', 'DustbinController.getDustbins')
  Route.put('/update/:id', 'DustbinController.updateDustbin')
  Route.delete('/delete/:id', 'DustbinController.deleteDustbin')
}).prefix('dustbin')


Route.group(() => {
  Route.post('/create', 'ModelSensorController.createModelSensor')
  Route.get('/getAll', 'ModelSensorController.getModelSensors')
  Route.put('/update/:id', 'ModelSensorController.updateModelSensor')
  Route.delete('/delete/:id', 'ModelSensorController.deleteModelSensor')
}).prefix('modelSensors')

Route.get('/mongo', 'MongoController.getSensors')
