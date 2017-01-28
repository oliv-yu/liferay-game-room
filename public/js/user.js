(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 500, height: 500 } };

    var canvasUpdate = document.getElementById('canvas-update');

	var buttonTakePhoto = document.getElementById("take-photo");

	var socket = io();

	setInterval(function() {
		socket.emit('user-request');
	}, 500);

	socket.on('update-room', function(data){
		var image = new Image();

		image.onload = function() {
		    canvasUpdate.getContext('2d').drawImage(image, 0, 0, 500, 500, 0, 0, 500, 500);
		};

		image.src = data.buffer;
	});

}());