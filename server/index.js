const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')

// App/Server init
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Socket.io connection
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to the room ${user.room}` })

    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` })

    socket.join(user.room)

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    console.log(user)
    console.log(getUsersInRoom(user.room))

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left` })
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    }
  })
})

// Router as middleware
app.use(router)

// Start server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
