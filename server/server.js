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

   socket.emit("newMessage",{
      from: "DAni1231231",
      text: "Hey wasuuuuuuuup",
       createdAt: 123
   });

   socket.on("createMessage",(message)=>{
      console.log("createMessage",message);
   });

   socket.on("disconnect", ()=>{
       console.log("User Disconnected");
   });
});

server.listen(port, ()=>{
   console.log("Listening on port "+port);
});