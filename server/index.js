const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



app.get("/", (req, res) => {
    res.json(io.connectTimeout("http://localhost:3000"));
})

io.on("connection", (socket) => {
    console.log("user has connected");
    socket.on("chat message", (msg) => {
        console.log(msg)
      socket.emit(msg)  
      console.log(msg)
    })

    server.on("disconnection", () => {
        console.log("user disconnected");
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})