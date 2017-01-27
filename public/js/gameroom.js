(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 500, height: 500 } };

	var canvas = document.getElementById("canvas");

	var video = document.querySelector('video');

	var socket = io();

	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream) {
		video.srcObject = mediaStream;

		video.onloadedmetadata = function(e) {
			video.play();
		};
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); });

	socket.on('user-request', function() {
		canvas.getContext("2d").drawImage(video, 0, 0, 500, 500, 0, 0, 500, 500);
		var img = canvas.toDataURL("image/png");
		var stream = ss.createStream();
	    ss(socket).emit('image', stream, {image: true, buffer: img.toString('base64')});
	});

}());