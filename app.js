var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/camera-example/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

app.use(express.static('public'));

app.listen(9000, function () {
  console.log('Liferay Game Room on 9000');
});