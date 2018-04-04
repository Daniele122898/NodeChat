const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString, checkUniqueName} = require("./utils/validation");
const {getUserRooms} = require("./utils/rooms");
const {Users} = require("./utils/users");
const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("New user Connected");

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room name are required!");
        }
        params.room = params.room.toLowerCase().trim();

        let room = users.getUserList(params.room);

        //check if name is unique.
        if(checkUniqueName(params.name, room)){
            return callback("Username already taken!");
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("Admin", "Welcome to NodeChat"));
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin", `${params.name} has joined`));

        callback();
    });

    socket.on("createMessage",(message, callback)=>{
        let user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on("createLocationMessage", (coords)=>{
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on("disconnect", ()=>{
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left.`));
        }
    });
});

app.get("/api/getRooms", (req,res)=>{
    res.send(getUserRooms(io.sockets.adapter.rooms));
});

server.listen(port, ()=>{
   console.log("Listening on port "+port);
});