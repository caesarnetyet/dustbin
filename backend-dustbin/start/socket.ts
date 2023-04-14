import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  console.log('a user connected')

  socket.on('joystick', (data) => {
    console.log(data)
    socket.broadcast.emit('coordinates', data)
  })

  socket.on('ping', (data) => {
    console.log(data)
    socket.broadcast.emit('pong', data)
  })
})