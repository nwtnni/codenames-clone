$(function() {
	var appID = "28E04352";
	var namespace = "codenames-clone";
	var session = null;


	if (!chrome.cast || !chrome.cast.isAvailable) {
		setTimeout(initializeCastApi, 1000);
	}

	function initializeCastApi() {
		var request = new chrome.cast.SessionRequest(appID);
		var apiConfig = new chrome.cast.ApiConfig(request, sessionListener, receiverListener);
		chrome.cast.initialize(apiConfig, onInitSuccess, onError);
	}

	function sessionListener(e) {
		session = e;
	}

	function receiverListener(e) {

	}

	function onInitSuccess() {
	}

	function onError(message) {
	}
});