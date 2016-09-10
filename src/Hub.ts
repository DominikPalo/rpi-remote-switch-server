import {DeviceConfig} from "./DevicesConfig";
import Socket = SocketIO.Socket;

export default class Hub {
    /**
     * Socket used for communication with the hub.
     */
    socket: Socket;

    name: string;
    uptime: number;
    devicesConfig: DeviceConfig[];
}