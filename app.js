var express = require('express')

var http = require('http');

var app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var ss = require('socket.io-stream');

var path = require('path');

var fs = require('fs');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/user/index.html');
});

// app.get('/pingpong', function(req, res) {
// 	res.sendFile(__dirname + '/gameroom/index.html');
// });

app.get('/pingpong', function(req, res) {
	res.sendFile(__dirname + '/pingpong/index.html');
});

app.get('/foosball', function(req, res) {
	res.sendFile(__dirname + '/foosball/index.html');
});


io.on('connection', function(socket){
	socket.on('user-request', function(data){
		socket.broadcast.emit('user-request');
	});

	ss(socket).on('pingpong', function(stream, data) {
		socket.broadcast.emit('update-pingpong', data);
	});

	ss(socket).on('foosball', function(stream, data) {
		socket.broadcast.emit('update-foosball', data);
	});
});

app.use(express.static('public'));

server.listen(9000, function () {
	console.log('Liferay Game Room on 80');
});