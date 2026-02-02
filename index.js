import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app) // creates a real TCP + HTTP server 



// socket.io does not replace http it extends it

// socket.IO wraps the HTTP server
// it listens to HTTP requests and WebSocket upgrade request

// socket.IO then uses http handshake and upgrade it to webSocket protocol


// handles only socket.io relevant request and ignores the other
const io = new Server(server)

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// browser load socket.io using this ==> {const socket = io()} method on frontend
// jsy he socket.io connection upgrade krdy ga browser "connection" event fire kry ga jo yhan handle hoga

io.on('connection', (socket) => {

    // 'socket' is one connected client
    console.log("Socket connected, ID:", socket.id);
    socket.on('client message', (message) => {
        // agr specifically isi client ko message emit krna h to socket.emit()
        // broadcast krna h sub clients ko to io.emit()
        // everyone except sender ==> socket.broadcast.emit()
        io.emit("server response", `Server: ${message}`)
    })
})

server.listen(8080, () => console.log("Server started at port 8080"))