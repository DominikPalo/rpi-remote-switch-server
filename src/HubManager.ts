import Namespace = SocketIO.Namespace;
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;

export default class HubManager {
    constructor(private ioServer: Server) {
        this.ioServer.use(require('socketio-wildcard')());

        this.ioServer.on("connection", (socket: Socket) => {
            console.log("New hub connected: " + socket.id);

            socket.on("register", (id: string, callback: Function) => {
                if (!id || id === "") {
                    return callback(null);
                }

                callback(this.registerHub(id, socket));
            });
        });
    }

    private registerHub(id: string, hubPrivateSocket: Socket): string {
        const publicAddress = `/${id}`;

        console.log(`Hub registered to address /hubs/${id}`);

        const hubPublicIo = this.ioServer.of(publicAddress);

        hubPublicIo.use(require('socketio-wildcard')());

        hubPublicIo.on("connection", (socket) => {
            console.log("new peer connected: " + socket.id);

            // Route all messages from client to hub
            socket.on("*", (event) => {
                hubPrivateSocket.emit.apply(hubPrivateSocket, event.data);
            })
        });

        // Route all messages from hub to all clients
        hubPrivateSocket.on("*", (event) => {
            hubPublicIo.emit.apply(hubPublicIo, event.data);
        });

        return publicAddress;
    }
}