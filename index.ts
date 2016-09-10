import express = require("express");
import http = require("http");
import socketIo = require("socket.io");
import util = require("util");

import Socket = SocketIO.Socket;


const app = express();
const server = http.createServer(<any>app);
const io = socketIo(server);

let clientSocket: Socket;

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
    console.log('New connection');
    clientSocket = socket;

    clientSocket.on("webMessage", (payload) => {
        console.log("Message received from web: ", payload)
    });
});



server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});