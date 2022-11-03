//Tayla Orsmond u21467456
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //assign a random number to the user
    userNumber = Math.floor(Math.random() * 100);
    //send the number to the user
    socket.emit('join', userNumber);
    //send the number to all users
    socket.broadcast.emit('userConnected', userNumber);
    console.log(`User ${userNumber} connected`);

    socket.on('disconnect', () => {
        //send the number to all users
        socket.broadcast.emit('userDisconnected', userNumber);
        console.log(`User ${userNumber} disconnected`);
    });

    socket.on('chatMessage', ({user, message}) => {
        io.emit('chatMessage', {user, message});
        console.log(`${user} sent a message: ${message}`);
    });
    
});

server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});