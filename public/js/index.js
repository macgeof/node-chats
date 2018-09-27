var _socket = io();

var _connectHandler = function() {
  console.log('Connected to server');
};

var _disconnectHandler = function() {
  console.log('Disconnected from the server');
};

var _newMessageHandler = function (__data) {
  console.log('New message recieved', JSON.stringify(__data, undefined, 2));
}

_socket.on('connect', _connectHandler);
_socket.on('disconnect', _disconnectHandler);
_socket.on('newMessage', _newMessageHandler);
