import Namespace = SocketIO.Namespace;
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;
import WebManager from "./WebManager";
import Hub from "./Hub";

export default class HubManager {
    public webManager: WebManager;
    private io: Namespace;
    private connectedHubs: ConnectedHubs;

    constructor(ioServer: Server) {
        this.io = ioServer.of("/hub");
        this.connectedHubs = {};
    }

    public getHubData(key: string): Hub {
        return this.connectedHubs[key];
    }
}

type ConnectedHubs = { [id: string]: Hub }