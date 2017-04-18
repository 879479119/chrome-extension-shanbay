function wordSearchInit () {

	document.querySelector('.content__main-column').addEventListener("click",function (e) {
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

	function simpleSound(source) {
		var audio = document.createElement('audio');
		audio.src = source;
		audio.setAttribute("autoplay", "true");
		document.querySelector('body').appendChild(audio);
	}

}
