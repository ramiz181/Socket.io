import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log("Socket connected, ID:", socket.id);
    socket.on('client message', (message) => {
        console.log("Client Message: ", message);
        io.emit("server response", `Server: ${message}`)
    })
})

server.listen(8080, () => console.log("Server started at port 8080"))