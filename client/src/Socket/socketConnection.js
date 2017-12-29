import io from "socket.io-client";
var socket = io.connect("http://localhost:3002");

export default socket;