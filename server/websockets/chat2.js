var chat = require("../../client/src/Constants/ChatConstants");

module.exports = function(http) {
    const io = require("socket.io")(3002, {
        path: "/", 
        serverClient: false, 
        // send ping every 20s
        pingInterval: 20000,
        pingTimeout: 30000,
        cookie: false
    });

    let USERS_CONNECTED = [];

    let time = (Date.now() / 1000) + 10;

    io.on("connection", (socket) => {
        USERS_CONNECTED.push(socket.id);
        console.log("USER CONNECTED " + socket.id);
        console.log("USER COUNT: " + USERS_CONNECTED.length);

        socket.on(chat.NEW_MESSAGE, (data) => {
            // emit new message to all sockets
            io.emit(chat.ADD_MESSAGE, data);
        });

        // recieve player count request from client
        socket.on(chat.REQUEST_PLAYERCOUNT, () => {
            io.emit(chat.PLAYERCOUNT, USERS_CONNECTED.length);
        })

        // recieve round time request
        socket.on(chat.REQUEST_ROUNDTIME, () => {
            socket.emit(chat.ROUNDTIME, time);
        });

        socket.on("disconnect", () => {
            USERS_CONNECTED.splice(USERS_CONNECTED.indexOf(socket.id), 1);
            io.emit(chat.PLAYERCOUNT, USERS_CONNECTED.length);
            
            console.log("User Disconnected");
            console.log("USER COUNT: " + USERS_CONNECTED.length);
        });
    });
};