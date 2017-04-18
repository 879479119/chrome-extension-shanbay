/**
 * Created by zi on 2017/4/18.
 */
var context;

try {
	var audio = document.createElement('audio');
	document.querySelector('body').appendChild(audio);
	context = new AudioContext();
} catch(e) {
	throw new Error('The Web Audio API is unavailable');
}

function listen(url) {
	fetch(url).then(function (res) {
		return res.blob()
	}).then(function (buffer) {
		var sound = context.createBufferSource();
		var arrayBuffer;
		var fileReader = new FileReader();
		fileReader.onload = function() {
			arrayBuffer = this.result;
			context.decodeAudioData(arrayBuffer, function(buffer) {
				sound = context.createMediaElementSource(audio);
				sound.buffer = buffer;
				sound.connect(context.destination);
				audio.play();
			})
		};
		fileReader.readAsArrayBuffer(buffer);
	})
}