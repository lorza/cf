var chatConst = require("../../client/src/Constants/ChatConstants");

// MESSAGE CONSTANTS
var NEW_MESSAGE = "NEW_MESSAGE";
var ADD_MESSAGE = "ADD_MESSAGE"
var REQUEST_MESSAGES = "REQUEST_MESSAGES";
var REQUESTED_MESSAGES = "REQUESTED_MESSAGES";

// PLAYER CONSTS
var REQUEST_PLAYERCOUNT = "REQUEST_PLAYERCOUNT";
var PLAYERCOUNT = "PLAYERCOUNT";

// GAME CONSTS
var REQUEST_ROUNDTIME = "REQUEST_ROUNDTIME";
var ROUNDTIME = "ROUNDTIME";

module.exports = function(http) {
	const io = require("socket.io")(3002, {
		path: "/",
		serveClient: false,
		// Send Ping Every 20 Seconds
		pingInterval: 20000,
		// Close connection if no ping recieved after 30 seconds
		pingTimeout: 30000,
		cookie: false
	});

	let USERS_CONNECTED = [];

	io.on("connection", (socket) => {
		USERS_CONNECTED.push(socket.id);
		console.log("USER CONNECTED: " + socket.id);
		console.log("USER COUNT: " + USERS_CONNECTED.length);

		// RECIEVE NEW MESSAGE FROM CLIENT
		socket.on(NEW_MESSAGE, (data) => {
			// EMIT NEW MESSAGE TO ALL SOCKETS
			io.emit(ADD_MESSAGE, data);
		})

		// RECIEVE PLAYER COUNT REQUEST FROM CLIENT
		socket.on(REQUEST_PLAYERCOUNT, () => {
			io.emit(PLAYERCOUNT, USERS_CONNECTED.length);
		})

		// RECIEVE ROUND TIME REQUEST

		let time = (Date.now() / 1000) + 10;

		socket.on(REQUEST_ROUNDTIME, () => {
			socket.emit(ROUNDTIME, time);
		})

		socket.on("disconnect", () => {
			USERS_CONNECTED.splice(USERS_CONNECTED.indexOf(socket.id), 1);
			io.emit(PLAYERCOUNT, USERS_CONNECTED.length);
			console.log("User Disconnected");
			console.log("USER COUNT: " + USERS_CONNECTED.length);
		})
	});
}