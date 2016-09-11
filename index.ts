import socketIo = require("socket.io");
import HubManager from "./src/HubManager";

const io = socketIo();

const hubManager = new HubManager(io);

const port = process.env.PORT || 3000;

io.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});