var _socket = io();

_socket.on('connect', function () {
  console.log('Connected to server');
});

_socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

_socket.on('newMessage', function (message) {
  // console.log('newMessage', message);
  var li = jQuery('<li></li>');
  var formattedTime = moment(message.createdAt).format('h:mm a');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

_socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var a = jQuery('<a target="_blank">my current location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = jQuery('[name=message]');
  _socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var _locationButton = jQuery("#send-location");
_locationButton.on('click', function (__event){
  if (!navigator.geolocation) {
    return alert('Unsupported browser for handling Geolocation');
  }
  _locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (__position) {
    _socket.emit('createLocationMessage', {
      latitude:__position.coords.latitude,
      longitude:__position.coords.longitude,
    });
    _locationButton.removeAttr('disabled').text('Send location');
  }, function (__error) {
    alert(`Unable to fetch location ${__error}`);
    _locationButton.removeAttr('disabled').text('Send location');
  });
});
