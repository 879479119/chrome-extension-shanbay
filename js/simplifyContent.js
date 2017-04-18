/**
 * listener initialize
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//save the status and reload
	chrome.storage.sync.set(request, function (err) {
		location.reload();
	});
	// sendResponse()
});


/**
 * init the plugin according to the level
 */
chrome.storage.sync.get('level',function (res) {
	console.log('123123',res);
	//noinspection FallThroughInSwitchStatementJS
	switch (res.level || 0){
		//add diffirent level
		case 2:
			document.body.classList.add('shanbay-filter-prefixer-1');
		case 1:
			document.body.classList.add('shanbay-filter-prefixer-0');
		case 0:
			//Don't import any filter
		default:
	}
});

/**
 * init word search
 */
wordSearchInit();

/**
 * init the pagination and reload when user resize window
 */


var running = false;
window.addEventListener("resize",function (e) {
	console.log("all work should be done after resize");
	if(running === false) {
		running = true;
		paginationInit();
		setTimeout(function () {
			running = false
		},200);
	}
});

//it takes some time to hide the parts we don't need
setTimeout(paginationInit,2000);
