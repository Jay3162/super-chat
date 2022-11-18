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

socketIO.on("connection", (socket) => {
    console.log("user has connected");
    socket.on("message", msg => {
      socket.emit("chatResponse", msg)
    })

    socket.on("newUser", data => {
        users.push(data)
        socketIO.emit("newUserResponse", users)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
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