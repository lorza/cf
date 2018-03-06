const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const pw = require("generate-password");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const app = express();
const http = require("http").Server(app);

const config = require("./server/config.js");
const secret = config.secret;
const db = config.db
const port = process.env.PORT || 3001;

const log = function(message) {
  console.log(message);
}

// Middleware
// ==================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
// ==================================================

mongoose.connect(db, {useMongoClient: true}, (err) => {
  let m;
  err ? m = "\nERR CONNECTING TO DB" : m = "\nMongoDB Cloud Server: CONNECTION SUCCESSFUL";
  log(m);
});
mongoose.Promise = global.Promise;

// WEBSOCKETS
require("./server/websockets/chat2.js")();

// Routing
// const api = require("./server/routes/api")(express, jwt, config);
// const api2 = require("./server/routes/routes")(express, jwt, config);

require("./server/routes/routes")(app);

const stats = require("./server/routes/stats")(express)
app.use("/stats", stats);

app.get("/", (req, res) => {
  res.send("Hello! The api is located at http://localhost:"+port+"/api");
})

http.listen(port, () => {
  console.log(`server running at: http://localhost:${port}\n`);
});
