import Ws from 'App/Services/Ws'
import { runMongo } from 'App/Controllers/Conection/MongoConection'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {


  socket.emit('news', { hello: 'world' })
  console.log('a user connected')
  console.log(socket.id)

  socket.on('joystick', (data) => {
    console.log(data)
    socket.broadcast.emit('coordinates', data)
  })

  socket.on('ping', (data) => {
    console.log(data)
    socket.broadcast.emit('pong', data)
  })
})
runMongo()


