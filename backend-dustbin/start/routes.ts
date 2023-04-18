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
  Route.post('/save', 'SensorsController.saveSensor')
  Route.get('/get', 'SensorsController.getSensors')
  Route.put('/update/:id', 'SensorsController.updateSensor')
  Route.delete('/delete/:id', 'SensorsController.deleteSensor')
}).prefix('sensor')
