$(document).ready(function () {
    chatRooms();
});

function chatRooms() {
    var roomSel = $('.room-selection__rooms');
    var roomInput = $('#room-input');
    $.get(window.location.origin+"/api/getRooms", function (rooms) {
        var template = $('#room-template').html();
        rooms.forEach(function (room) {
          var html = $(Mustache.render(template, {room: room}));
          html.on("click", function () {
              roomInput.val(room);
          });
          roomSel.append(html);
       });
    });
}