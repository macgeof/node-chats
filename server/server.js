const _path = require('path');
const _http = require('http');
const _express = require('express');
const _socketIO = require('socket.io');

const _generateMessage = require('./utils/message').generateMessage;

const _port = process.env.PORT || 3000;
const _publicPath = _path.join(__dirname, '../public');

const _app = new _express();
const _server = _http.createServer(_app);
const _io = _socketIO(_server);
let _socket;

_app.use(_express.static(_publicPath));

_io.on('connection', (__socket) => {
  console.log('New user has connected');
  _configureSocket(__socket);

  _socket.emit('newMessage', _generateMessage('Admin','Welcome to the chat app'));

  _socket.broadcast.emit('newMessage', _generateMessage('Admin','New user joined the chat app'));
});

const _configureSocket = function (__socket) {
  _socket = __socket;

  _socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });

  _socket.on('createMessage', (__data, __callback) => {
    const __response = _generateMessage(__data.from, __data.text, __data.id, (__callback !== null));
    _io.emit('newMessage', __response);
    if (__callback && typeof __callback === 'function') {
      __callback({from:__data.from, text:__data.text, message:__data.message});
    }
      __callback = null;
  });
}

_server.listen(_port, () => {
  console.log(`Server is started on port ${_port}`);
});
