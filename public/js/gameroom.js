(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 300, height: 300 } };

	var canvas = document.getElementById("canvas");

	var title = document.getElementsByTagName("TITLE")[0].innerHTML;

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
		canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
		var img = canvas.toDataURL("image/png");
		var stream = ss.createStream();
	    ss(socket).emit(title, stream, {image: true, buffer: img.toString('base64')});
	});

}());