$(function() {

    var namespace = "urn:x-cast:codenames.update";

    var manager = cast.receiver.CastReceiverManager.getInstance();
    var updateBus = manager.getCastMessageBus(updateNamespace);

    updateBus.onMessage(function(message) {
    	console.log(message.data);
    });

   	manager.start();


});