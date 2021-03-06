var socket = io();
var lastUser ="";

function scrollToBottom(){
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function () {
    var params = $.deparam(window.location.search);
    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("no error");
        }
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from Server");
});

socket.on("updateUserList", function (users) {
    let ol = $('<ul></ul>');
    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on("newMessage", function (message) {
    if(message.from !== lastUser) {
        var formattedTime = moment(message.createdAt).format("h:mm a");
        var template = $("#message-template").html();
        var html = Mustache.render(template, {
            text: message.text, //text: emojione.toImage(message.text)
            from: message.from,
            createdAt: formattedTime
        });
        $('#messages').append(html);
        lastUser = message.from;
    } else {
        var template = $("#message-template-small").html();
        var html = Mustache.render(template, {text: message.text});
        $('#messages').append(html);
    }
    scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var msgTextBox = $("[name=message]");
    var text = msgTextBox.val();
    msgTextBox.val("");

    socket.emit("createMessage", {
        text
    }, function () {
        //ignored
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