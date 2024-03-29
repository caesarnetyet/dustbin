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
  Route.post('/activate/:user', 'UsersController.activate').as('activate')
  Route.post('/login', 'UsersController.login')
  Route.post('/logout', 'UsersController.logout')
  Route.put('/', 'UsersController.update').middleware('auth')
  Route.delete('/', 'UsersController.destroy').middleware('auth')
}).prefix('user')

Route.group(() => {
  Route.post('/create', 'SensorsController.saveSensor').middleware('auth')
  Route.get('/getAll', 'SensorsController.getSensors').middleware('auth')
  Route.put('/update/:id', 'SensorsController.updateSensor').middleware('auth').where('id', '[0-9]+')
  Route.delete('/delete/:id', 'SensorsController.deleteSensor').middleware('auth').where('id', '[0-9]+')
}).prefix('sensor')

Route.group(() => {
  Route.post('/create', 'AdminsController.createUser').middleware('auth')
  Route.get('/getAll', 'AdminsController.getUsers').middleware('auth')
  Route.get('/getDustbins', 'UsersController.getDustbins').middleware('auth')
  Route.put('/update/:id', 'AdminsController.updateUser').middleware('auth').where('id', '[0-9]+')
  Route.delete('/delete/:id', 'AdminsController.deleteUser').middleware('auth').where('id', '[0-9]+')
}).prefix('user')

Route.group(() => {
  Route.post('/create', 'ModelController.createModel').middleware('auth')
  Route.get('/getAll', 'ModelController.getModels').middleware('auth')

  Route.get('/getModelSensor', 'ModelController.getModelSensors').middleware('auth')
  Route.get('/getModelSensor/:id', 'ModelController.getModelSensors').middleware('auth')
  Route.put('/update/:id', 'ModelController.updateModel').middleware('auth').where('id', '[0-9]+')
  Route.delete('/delete/:id', 'ModelController.deleteModel').middleware('auth').where('id', '[0-9]+')
}).prefix('model')

Route.group(() => {
  Route.post('/create', 'DustbinController.createDustbin').middleware('auth')
  Route.get('/getAll', 'DustbinController.getDustbins').middleware('auth')
  Route.put('/update/:id', 'DustbinController.updateDustbin').middleware('auth').where('id', '[0-9]+')
  Route.delete('/delete/:id', 'DustbinController.deleteDustbin').middleware('auth').where('id', '[0-9]+')
}).prefix('dustbin')


Route.group(() => {
  Route.post('/create', 'ModelSensorController.createModelSensor').middleware('auth')
  Route.get('/getAll', 'ModelSensorController.getModelSensors').middleware('auth')
  Route.put('/update/:id', 'ModelSensorController.updateModelSensor').middleware('auth').where('id', '[0-9]+')
  Route.delete('/delete/:id', 'ModelSensorController.deleteModelSensor').middleware('auth').where('id', '[0-9]+')
}).prefix('modelSensors')

Route.get('/mongo/sensors', 'MongoController.getSensors')
Route.get('/mongo/details', 'MongoController.getDetails')
