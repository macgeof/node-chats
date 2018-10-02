var _socket = io();

const _id = Date.now();

var _connectHandler = function() {
  console.log('Connected to server');
};

var _disconnectHandler = function() {
  console.log('Disconnected from the server');
};

var _newMessageHandler = function (__data) {
  console.log('New message recieved', JSON.stringify(__data, undefined, 2));
  if (__data && __data.id !== _id &&  __data.isAcknowledgement == false)
    _acknowledgementHandler(__data);
};

var _acknowledgementHandler = function (__response) {
  // console.log('Got it.', __response);
  var __li = jQuery(`<li></li>`);
  const __serverMessage = (__response.message) ? `: ${__response.message}` : '';
  __li.text(`${__response.from} : ${__response.text} ${__serverMessage}`);
  jQuery('#messages').append(__li);
};

var _formSubmitHandler = function (__event) {
  __event.preventDefault();

  _socket.emit('createMessage', {
    from:'User',
    id:_id,
    text:jQuery('[name=message]').val()
  }, _acknowledgementHandler);
}


_socket.on('connect', _connectHandler);
_socket.on('disconnect', _disconnectHandler);
_socket.on('newMessage', _newMessageHandler);

jQuery('#message-form').on('submit', _formSubmitHandler);
