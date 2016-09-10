import Server = SocketIO.Server;
import HubManager from "./HubManager";
import WebManager from "./WebManager";

export default class Dispatcher {

    constructor(
        hubManager: HubManager,
        webManager: WebManager
    ) {
        webManager.hubManager = hubManager;
        hubManager.webManager = webManager;
    }
}