const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//code for socket

const io = require('socket.io')(http)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', namee => {
        users[socket.id] = namee;
        socket.broadcast.emit('user-joined', namee);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, namee: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


});