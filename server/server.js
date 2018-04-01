const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
   console.log("New user Connected");

    socket.emit("newMessage", {
       from:"Admin",
        text: "Welcome to NodeChat",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit("newMessage",{
       from:"Admin",
        text:"User joined the Chat!",
        createdAt: new Date().getTime()
    });

   socket.on("createMessage",(message)=>{
      console.log("createMessage",message);
      io.emit("newMessage", {
         from: message.from,
          text:message.text,
          createdAt: new Date().getTime()
      });
   });

   socket.on("disconnect", ()=>{
       console.log("User Disconnected");
   });
});

server.listen(port, ()=>{
   console.log("Listening on port "+port);
});