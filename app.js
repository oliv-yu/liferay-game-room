var express = require('express')

var http = require('http');

var app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var ss = require('socket.io-stream');

var path = require('path');

var fs = require('fs');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/camera-example/index.html');
});

io.on('connection', function(socket){
	socket.on('test', function(data){
		console.log(data);
	});

	ss(socket).on('image', function(stream, data) {
		socket.broadcast.emit('update-room', data);
	});
});


app.use(express.static('public'));

server.listen(9000, function () {
  console.log('Liferay Game Room on 9000');
});