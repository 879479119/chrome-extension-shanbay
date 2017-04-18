function paginationInit () {
	//模板
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

	//存入跳转高度数据
	var str = "";
	for(var i = 0;i <= count;i ++){
		str += "<a href='javascript:;' data-height='"+i*clitn+"'>"+(i+1)+"</a>";
	}

	//创建节点
	var page = document.createElement('div');
	page.classList.add('pagination-i');
	page.innerHTML = temp(str);

	//没有节点时会出错
	try{
		document.querySelector('.pagination-i').remove();
	}catch(e){
		console.log('first Time');
	}

	document.querySelector('body').appendChild(page);

	//添加点击事件，翻页处理
	page.addEventListener("click",function (e) {
		var h;
		if(h = e.target.getAttribute('data-height')){
			h = parseInt(h);
			window.scrollTo(0,h);
		}
	});
}
