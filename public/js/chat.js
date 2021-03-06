var _socket = io();

// UI elements
var _locationButton = jQuery("#send-location");
var _form = jQuery('#message-form');
let _messageTextBox = jQuery('[name=message]');
var _messages = jQuery('#messages');
var _messageTempate = jQuery('#message-template');
var _locationMessageTempate = jQuery('#location-message-template');

function _scrollToBottom() {
  // Selectors
  var __newMessage = _messages.children('li:last-child');
  // Heights
  var __clientHeight = _messages.prop('clientHeight');
  var __scrollTop = _messages.prop('scrollTop');
  var __scrollHeight = _messages.prop('scrollHeight');
  var __newMessageHeight = __newMessage.innerHeight();
  var __lastMessageHeight = __newMessage.prev().innerHeight();
  if (__clientHeight + __scrollTop + __newMessageHeight + __lastMessageHeight >= __scrollHeight) {
    _messages.scrollTop(__scrollHeight);
  }
}

_socket.on('connect', function () {
  console.log('Connected to server');
});

_socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

_socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = _messageTempate.html();
  var html = Mustache.render(template, {
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  _messages.append(html);
  _scrollToBottom();
});

_socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = _locationMessageTempate.html();
    var html = Mustache.render(template, {
      url:message.url,
      from:message.from,
      createdAt:formattedTime
    });
    _messages.append(html);
    _scrollToBottom();
});

_form.on('submit', function (e) {
  e.preventDefault();
  _socket.emit('createMessage', {
    from: 'User',
    text: _messageTextBox.val()
  }, function () {
    _messageTextBox.val('');
  });
});

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
