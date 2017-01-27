(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 500, height: 500 } };

	var canvas = document.getElementById("canvas");

    var canvasUpdate = document.getElementById('canvas-update');

	var video = document.querySelector('video');

	var buttonTakePhoto = document.getElementById("take-photo");

	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream) {
		video.srcObject = mediaStream;


		buttonTakePhoto.onclick = function() {
			canvas.getContext("2d").drawImage(video, 0, 0, 500, 500, 0, 0, 500, 500);
			var img = canvas.toDataURL("image/png");
			var stream = ss.createStream();
		    ss(socket).emit('image', stream, {image: true, buffer: img.toString('base64')});
		};

		video.onloadedmetadata = function(e) {
			video.play();
		};
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); });

	var socket = io();

	socket.emit('test', 'test');

	socket.on('update-room', function(data){
		var image = new Image();

		image.onload = function() {
		    canvasUpdate.getContext('2d').drawImage(image, 0, 0, 500, 500, 0, 0, 500, 500);
		};

		image.src = data.buffer;
	});

}());