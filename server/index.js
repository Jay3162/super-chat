const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http").Server(app);
const PORT = 4000
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());
let users = [];
let regUsers = [];

socketIO.on("connection", (socket) => {
    console.log(`user has connected - ${socket.id}`);
    socket.on("message", msg => {
      socketIO.emit("chatResponse", msg)
    })
    console.log(socket.id)

    socket.on("newUser", data => {
        users.push(data)
        socketIO.emit("newUserResponse", users)
    })

    socket.on("newRegUser", data => {
        regUsers.push(data)
        socketIO.emit("newRegUserResponse", regUsers)
    })

    socket.on("disconnect", () => {
        console.log(`user disconnected - ${socket.id}`);
        users = users.filter((user) => socket.id !== user.socketID)
        socketIO.emit("newUserResponse", users)
        socket.disconnect()
    });
});

app.get("/api", (req, res) => {
    res.json({Hello: "server"})
})

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})