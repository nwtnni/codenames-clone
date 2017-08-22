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
	if (e === 'available') {
		$("#debug")[0].textContent = "Receiver found!";
	} else {
		$("#debug")[0].textContent = "No receivers.";
	}
}

function onInitSuccess() {
	$("#debug")[0].textContent = "Success!";
}

function onError(message) {
	$("#debug")[0].textContent = "Error: " + message;
}