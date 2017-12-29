import AppDispatcher from "../AppDispatcher";
import * as ChatConstants from "../Constants/ChatConstants";
import { EventEmitter } from "events";
import * as KM from "key-mirror";

// export default socket
var socket = require("../Socket/socketConnection").default;
var CHANGE = "change_event";

class ChatStoreClass extends EventEmitter {
    constructor() {
        super();

        this._messages = [];
        this._userCount = 1;

        // LISTENS TO SOCKET || NOT REALLY FLUX :(
        // socket.on(ChatConstants.ADD_MESSAGE, (data) => {
        //     this._messages.push(data);
        //     this._emitChange();
        // })
    }

    init() {
        this._emitChange();
    }
    
    getMessages() {
        return [...this._messages]
    }

    getUsercount() {
        return this._userCount;
    }

    getUserData() {
        return localStorage.getItem("userData");
    }

    _emitChange() {
        this.emit(CHANGE);
    }


}

var ChatStore = new ChatStoreClass;

AppDispatcher.register(function(payload){
    switch(payload.actionType) {
        case ChatConstants.REQUEST_PLAYERCOUNT:
            socket.emit(ChatConstants.REQUEST_PLAYERCOUNT);
            break;
        case ChatConstants.ADD_MESSAGE:
            socket.emit(ChatConstants.NEW_MESSAGE, payload.action);
            break;
        case ChatConstants.REQUEST_PLAYERCOUNT:

    }
    ChatStore._emitChange();
})

// SOCKET LISTENERS
socket.on(ChatConstants.ADD_MESSAGE, (message) => {
    ChatStore._messages.push(message);
    ChatStore._emitChange();
})

socket.on(ChatConstants.PLAYERCOUNT, (x) => {
    console.log(x);
    ChatStore._userCount = x;

    console.log("USER COUNT: ", ChatStore._userCount)
    ChatStore._emitChange();
})

export default ChatStore;

