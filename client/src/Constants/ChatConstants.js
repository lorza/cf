var KM = require("key-mirror");

module.exports = KM({
    INIT_MESSAGES: null,
    
    NEW_MESSAGE: null,
    ADD_MESSAGE: null,

    // SEND REQUEST TO SERVER
    REQUEST_MESSAGES: null,
    // RECIEVE REQUEST FROM SERVER
    MESSAGES: null,

    // PLAYER CONSTS
    REQUEST_PLAYERCOUNT: null,
    PLAYERCOUNT: null,

    // GAME CONSTS
    REQUEST_ROUNDTIME: null,
    ROUNDTIME: null,
});