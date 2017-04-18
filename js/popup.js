function closeFilter() {
	sendMessage({
		level: 0
	},function () {

	});
}

function adsFilter() {
	sendMessage({
		level: 1
	},function () {

	});
}

function forceFilter() {
	sendMessage({
		level: 2
	},function () {

	});
}

function sendMessage(msg, callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
			callback(response)
		});
	});
}

document.querySelector('ul').addEventListener('click',function (evt) {
	if(evt.target.nodeName.toLowerCase() === "a"){
		window[evt.target.className]()
	}
});

chrome.storage.sync.get('level',function (res) {
	document.querySelectorAll('a')[res.level || 0].classList.add('active')
});
