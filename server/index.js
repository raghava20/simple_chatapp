import express from 'express';
import cors from "cors"
import { Server } from "socket.io"
import http from "http"
import { router } from './router.js';
import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

const app = express()
app.use(cors())

app.use(router)
const PORT = process.env.PORT || 5000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})


io.on('connect', (socket) => {
    console.log('new connection')

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}` })

        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room)
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

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
            io.to(user.room).emit('message', { user: "admin", text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })

})


httpServer.listen(PORT, () => console.log("Server running on ", PORT))