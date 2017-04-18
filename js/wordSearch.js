function wordSearchInit () {

	document.addEventListener("click",function (e) {
		//点击事件
		var old = document.querySelector('.tip-def');
		//去掉旧的标签，点击框内时不消失
		old && !isChildOf(e.target, old) && old.remove();

		//处理选取内容
		var select = window.getSelection();
		var offset = select.anchorOffset,
			node = select.anchorNode,
			content = node.textContent;
		var word = null;
		//一个单词一个单词往后匹配（没有考虑中文）
		var lastPos = 0, reg = /\w+/g;
		while(reg.exec(content)){
			if(reg.lastIndex > offset){
				//maybe we don't need lowercase ?
				word = content.slice(lastPos, reg.lastIndex).match(/\w+/g)[0].toLowerCase();

				break;
			}
			lastPos = reg.lastIndex
		}
		//如果点击空白处没有匹配到单词就不管他
		if(word === null){
			return
		}

		var _ = Date.now();
		//获取判断框位置的各个参数
		var clientWidth = document.documentElement.clientWidth,
			clientHeight = document.documentElement.clientHeight,
			clientX = e.clientX,
			clientY = e.clientY;
		var oX = e.pageX,
			oY = e.pageY,
			fontSize = parseInt(e.target.ownerDocument.defaultView.getComputedStyle(e.target,e.target.nodeName)['font-size']);
		//偏移框的位置（框的大小是固定的）
		if(clientWidth < clientX + 200 + 20){
			oX -= 200
		}
		if(clientHeight< clientY + 120 + fontSize){
			oY -= 120 - fontSize
		}else{
			oY += fontSize * 0.8
		}
		//使用fetch获取接口数据
		fetch("https://www.shanbay.com/api/v1/bdc/search/?version=2&word="+word+"&_="+_).then(function (e) {
			return e.json()
		}).then(function (res) {
			//获取成功时，展示数据处理
			if(res.status_code === 0){
				var def = res.data.definitions.cn[0].defn,
					source = res.data.audio_addresses.uk[0];
				var mean = '';
				//超过三条以上的数据过滤掉
				res.data.definitions.cn.forEach(function (item, index) {
					if(index > 2) return ;
					mean += '<p><span>'+item.pos+'</span>';
					mean += item.defn+'</p>';
				});

				var template =
					'<p class="word-content">'+res.data.content+'</p>' +
					'<p class="play">' +
						'<small>uk:</small>\\'+res.data.pronunciations.uk+'\\<span class="audio-play" data-url="'+res.data.audio_addresses.uk[0]+'" ></span>&nbsp;&nbsp;&nbsp;' +
						'<small>us:</small>\\'+res.data.pronunciations.us+'\\<span class="audio-play" data-url="'+res.data.audio_addresses.us[0]+'" ></span>\
					</p>\
					<div class="def">'+mean+'</div>';

				var page = document.createElement('div');
				page.classList.add('tip-def');
				page.innerHTML = template;
				page.style.left = oX+'px';
				page.style.top = oY+'px';
				// e.target.style.position = "relative";
				document.body.appendChild(page);
			}else{
				//网络失败或没有单词的错误处理
				console.error("Network or no word matched")
			}
		})
	});

	//简单添加audio播放声音
	function simpleSound(source) {
		var audio = document.createElement('audio');
		audio.src = source;
		audio.setAttribute("autoplay", "true");
		document.querySelector('body').appendChild(audio);
		audio.addEventListener("ended",function () {
			audio.remove()
		})
	}

	//判断子DOM
	function isChildOf(child, parent) {
		var parentNode;
		if(child && parent) {
			parentNode = child.parentNode;
			while(parentNode) {
				if(parent === parentNode) {
					return true;
				}
				parentNode = parentNode.parentNode;
			}
		}
		return false;
	}

	//额外绑定的点击事件，点击播放声音
	document.querySelector('body').addEventListener('click',function (e) {
		if(e.target.className.indexOf('audio-play') > -1){
			simpleSound(e.target.getAttribute('data-url'))
		}
	})
}
