$(function() {

    var namespace = "urn:x-cast:codenames.update";

    var manager = cast.receiver.CastReceiverManager.getInstance();
    var resetBus = manager.getCastMessageBus(resetNamespace);
    var updateBus = manager.getCastMessageBus(updateNamespace);

   	manager.start();


});