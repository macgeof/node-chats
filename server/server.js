const _path = require('path');
const _http = require('http');
const _express = require('express');
const _socketIO = require('socket.io');

const _port = process.env.PORT || 3000;
const _publicPath = _path.join(__dirname, '../public');

const _app = new _express();
const _server = _http.createServer(_app);
const _io = _socketIO(_server);
let _socket;

_app.use(_express.static(_publicPath));

_io.on('connection', (__socket) => {
  console.log('New user connected');
  _configureSocket(__socket);
});

const _configureSocket = function (__socket) {
  _socket = __socket;

  _socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });

  _socket.on('createMessage', (__data) => {
    __data.createdAt = Date.now();
    _io.emit('newMessage', __data);
  });
}

_server.listen(_port, () => {
  console.log(`Server is started on port ${_port}`);
});
