(function() {
	'use strict';

    var constraints = { audio: false, video: { width: 500, height: 500 } };

	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream) {
	  var video = document.querySelector('video');
	  video.srcObject = mediaStream;
	  var canvas = document.getElementById("canvas");

	  var button = document.getElementById("take-photo");

		button.onclick = function() {
			canvas.getContext("2d").drawImage(video, 0, 0, 500, 500, 0, 0, 500, 500);
			var img = canvas.toDataURL("image/png");
		};

		video.onloadedmetadata = function(e) {
			video.play();
		};
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); });


}());