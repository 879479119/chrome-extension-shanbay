/**
 * -------------------------------------------------------------------------------------------------------------
 */

function temp(anchor) {
	var template1 =
		' <div class="container">\
			<section class="page-number">';
	var template2 =
			'</section>\
			<section class="back-top">\
				<a href="#">back</a>\
			</section>\
		</div>';
	return template1+anchor+template2;
}

var total = document.documentElement.scrollHeight,
	clitn = document.documentElement.clientHeight,
	count = Math.floor(total/ clitn);

var str = "";
for(var i = 0;i < count;i ++){
	str += "<a href='javascript:;' data-height='"+i*clitn+"'>"+(i+1)+"</a>";
}

var page = document.createElement('div');
page.classList.add('pagination-i');
page.innerHTML = temp(str);
document.querySelector('body').appendChild(page);

page.addEventListener("click",function (e) {
	console.log(e.target);
	var h;
	if(h = e.target.getAttribute('data-height')){
		h = parseInt(h);
		window.scrollTo(0,h);
	}
});

/**
 * ============================================================================================================
 */

document.addEventListener("click",function (e) {
	//clear the old one
	var old = document.querySelector('.tip-def');
		old && old.remove();

	var select = window.getSelection();
	var offset = select.anchorOffset,
		node = select.anchorNode,
		content = node.textContent;
	var word = null;
	var lastPos = 0, reg = /\w+/g;
	while(reg.exec(content)){
		if(reg.lastIndex > offset){
			//maybe we don't need lowercase ?
			word = content.slice(lastPos, reg.lastIndex).trim().toLowerCase();
			console.log(word);
			break;
		}
		lastPos = reg.lastIndex
	}
	var _ = Date.now();

	console.log(e);
	var oX = e.offsetX,
		oY = e.offsetY;

	fetch("https://www.shanbay.com/api/v1/bdc/search/?version=2&word="+word+"&_="+_).then(function (e) {
		return e.json()
	}).then(function (res) {
		if(res.status_code === 0){
			var def = res.data.definitions.cn[0].defn,
				source = res.data.audio_addresses.uk[0];
			console.log(def,source);

			var template =
				'<div class="def">\
					<p>'+def+'</p>\
					<a href="javascript:;" class="play_audio">play</a>\
				</div>';


			var page = document.createElement('div');
			page.classList.add('tip-def');
			page.innerHTML = template;
			page.style.left = oX+'px';
			page.style.top = oY+'px';
			e.target.style.position = "relative";
			e.target.appendChild(page);

			simpleSound(source);
		}else{
			console.error("Network ?")
		}
	})
});

window.addEventListener("resize",function (e) {
	console.log("all work should be done after resize")
});

/**
 * ************************************************************************************************************
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


function simpleSound(source) {
	var audio = document.createElement('audio');
	audio.src = source;
	audio.setAttribute("autoplay","true");
	document.querySelector('body').appendChild(audio);
}



