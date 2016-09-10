import Namespace = SocketIO.Namespace;
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;
import HubManager from "./HubManager";

export default class WebManager {
    public hubManager: HubManager;
    private io: Namespace;

    constructor(ioServer: Server) {
        this.io = ioServer.of("/web");

        this.io.on("connection", (socket: Socket) => {
            console.log(`New web connected. ID: ${socket.id}`);

            this.registerWeb(socket);
        });
    }


    private registerWeb(socket: Socket) {
        socket.on(
            "connectToHub",
            (key, callback) => {
                const hub = this.hubManager.getHubData(key);
                callback(hub ? hub : "Hub with specified key is not connected.");
            });
    }


}

