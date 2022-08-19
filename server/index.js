import express from 'express'
const app = express()
import socketServer from './socket.js'
import { getCurrentUser, getRoomUsers, userJoin } from './utils/users.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000

app.use(express.static(__dirname +  '\\..\\Client\\build'))

const server = app.listen(PORT, () => console.log('listening at',PORT))

const io = socketServer(server)

// Runs when the client connects
io.on('connection', (socket) => {


    socket.on('join_room', ({ userName, room }) => {
        const user = userJoin(socket.id, userName, room)
        console.log(user)
        socket.join(user.room)

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


    // Listen for updates in location
    socket.on('send-update', (location, dice, this_turn) =>{
        console.log(location, dice)
        const user = getCurrentUser(socket.id)
        socket.broadcast.to(user.room).emit('receive-update', {location, dice, this_turn})
    })
})