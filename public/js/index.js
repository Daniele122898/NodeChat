var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

});

socket.on("disconnect", function () {
    console.log("Disconnected from Server");
});

socket.on("newMessage", function (message) {
    console.log("new message", message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $("#messages").append(li);
});

socket.on("newLocationMessage", function (message) {
    var li = $("<li></li>");
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var msgTextBox = $("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: msgTextBox.val()
    }, function () {
        msgTextBox.val("");
    })
});

var locationButton = $("#send-location");
locationButton.on("click", function () {
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser!");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function (pos) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function () {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location.");
    });
});