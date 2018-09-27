var socket = io();

var connectHandler = function() {
  console.log('Connected to server');

    socket.emit('createMessage', {
      from : 'geof@here.com',
      text : 'here is my message'
    })
};

var disconnectHandler = function() {
  console.log('Disconnected from the server');
};

var newMessageHandler = function (__data) {
  console.log('New message recieved', JSON.stringify(__data, undefined, 2));
}

socket.on('connect', connectHandler);
socket.on('disconnect', disconnectHandler);
socket.on('newMessage', newMessageHandler);
