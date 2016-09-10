import express = require("express");
import http = require("http");
import socketIo = require("socket.io");
import util = require("util");

import Socket = SocketIO.Socket;
import Dispatcher from "./src/Dispatcher";
import WebManager from "./src/WebManager";
import HubManager from "./src/HubManager";

const app = express();
const server = http.createServer(<any>app);
const io = socketIo(server);

const dispatcher = new Dispatcher(
    new HubManager(io),
    new WebManager(io)
);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});