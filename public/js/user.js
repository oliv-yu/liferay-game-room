(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 300, height: 300 } };

    var canvasFoosball = document.getElementById('canvas-foosball');

    var canvasPingPong = document.getElementById('canvas-pingpong');

	var buttonTakePhoto = document.getElementById("take-photo");

	var socket = io();

	buttonTakePhoto.onclick = function() {
		socket.emit('user-request');
	};

	socket.on('update-pingpong', function(data){
		var image = new Image();

		image.onload = function() {
		    canvasPingPong.getContext('2d').drawImage(image, 0, 0, 300, 300, 0, 0, 300, 300);
		};

		image.src = data.buffer;
	});

	socket.on('update-foosball', function(data){
		var image = new Image();

		image.onload = function() {
		    canvasFoosball.getContext('2d').drawImage(image, 0, 0, 300, 300, 0, 0, 300, 300);
		};

		image.src = data.buffer;
	});

}());