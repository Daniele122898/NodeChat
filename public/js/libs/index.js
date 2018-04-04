$(document).ready(function () {
    chatRooms();
});

function chatRooms() {
    var roomSel = $('.room-selection__rooms');
    $.get(window.location.origin+"/api/getRooms", function (rooms) {
        var template = $('#room-template').html();
        rooms.forEach(function (room) {
            console.log(roomSel);
          /*var template = $("#message-template").html();
        var html = Mustache.render(template, {
            text: message.text, //text: emojione.toImage(message.text)
            from: message.from,
            createdAt: formattedTime
        });
        $('#messages').append(html);*/
          var html = Mustache.render(template, {room: room});
          console.log(html);
          roomSel.append(html);
       });
    });
}