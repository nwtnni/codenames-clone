$(function() {
    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    window.messageBus = window.castReceiverManager.getCastMessageBus("codenames-clone");

    function initialize(words) {

    }

    window.messageBus.onMessage = function(message) {
        
    };



    window.castReceiverManager.start({ statusText: 'Application is starting' });
});