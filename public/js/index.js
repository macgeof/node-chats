var _socket = io();

_socket.on('connect', function () {
  console.log('Connected to server');
});

_socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

_socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

_socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">my current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  _socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var _locationButton = jQuery("#send-location");
_locationButton.on('click', function (__event){
  if (!navigator.geolocation) {
    return alert('Unsupported browser for handling Geolocation');
  }

  navigator.geolocation.getCurrentPosition(function (__position) {
    _socket.emit('createLocationMessage', {
      latitude:__position.coords.latitude,
      longitude:__position.coords.longitude,
    });
  }, function (__error) {
    alert(`Unable to fetch location ${__error}`);
  });
});
