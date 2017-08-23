$(function() {
	var appID = "28E04352";
	var resetNamespace = "urn:x-cast:codenames.reset";
	var updateNamespace = "urn:x-cast:codenames.update";
	var session = null;

	if (!chrome.cast || !chrome.cast.isAvailable) {
		setTimeout(initializeCastApi, 1000);
	}

	function initializeCastApi() {
		var request = new chrome.cast.SessionRequest(appID);
		var apiConfig = new chrome.cast.ApiConfig(request, sessionListener, function(){});
		chrome.cast.initialize(apiConfig, onInitSuccess, onError);
	}

	function sessionListener(e) {
		session = e;
	}

	function onInitSuccess() {
		console.log("Successfully initialized");
		resetBoard();
	}

	function onError(message) {
		console.log(message);
	}

	function resetBoard() {
		fetch("../words.txt").then(function(response) {
			console.log(response.text());
		});
	}

	resetBoard();
});