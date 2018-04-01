const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("New user Connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to NodeChat"));

    socket.broadcast.emit("newMessage",generateMessage("Admin", "User joined the Chat!"));

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Name and room name are required.");
        }
        callback();
    });

    socket.on("createMessage",(message, callback)=>{
      console.log("createMessage",message);
      io.emit("newMessage", generateMessage(message.from, message.text));
      callback();
    });

    socket.on("createLocationMessage", (coords)=>{
       io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude))
    });

    socket.on("disconnect", ()=>{
       console.log("User Disconnected");
    });
});

server.listen(port, ()=>{
   console.log("Listening on port "+port);
});