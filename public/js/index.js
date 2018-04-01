var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

    socket.emit("createMessage", {
       from: "Dani12321312",
       text: "Some other shit"
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from Server");
});

socket.on("newMessage", function (message) {
    console.log("new message", message);
});