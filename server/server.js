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
  console.log('new user connected');
  _configureSocket(__socket);
});

const _configureSocket = function (__socket) {
  _socket = __socket;

  _socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });

  _socket.on('createMessage', (__data) => {
    console.log('Create message heard.', __data, 'about to emit response.');
    __data = {
      from : 'you@there.com',
      text : 'ok, that\'s fine by me',
      createdAt : Date.now()
    };
    _socket.emit('newMessage', __data);
  });
}

_server.listen(_port, () => {
  console.log(`Server is started on port ${_port}`);
});
