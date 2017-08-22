$(function() {
    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log("Starting receiver manager");

    castReceiverManager.onSenderConnected = function(event) {
        console.log("Sender connected: " + event.data);
    };

    castReceiverManager.onsenderDisconnected = function(event) {
        console.log("Sender disconnected: " + event.data);
    };

    window.castReceiverManager.start({ statusText: 'Application is starting' });
    console.log('Receiver Manager started');
});