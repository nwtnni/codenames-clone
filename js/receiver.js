var namespace = "urn:x-cast:codenames.update";

var manager = cast.receiver.CastReceiverManager.getInstance();
var updateBus = manager.getCastMessageBus(updateNamespace);

updateBus.onMessage(function(message) {
	$(".debug").innerHTML = message.data;
});

manager.onSenderConnected = function(event) {
	$(".debug").innerHTML = "Sender connected: " + event.data;
};

manager.onSenderDisconnected = function(event) {
	$(".debug").innerHTML = "Sender disconnected: " + event.data;
};



$(function() {
   	manager.start();
});