(function () {
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
})();
