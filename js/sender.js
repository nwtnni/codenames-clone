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
        var apiConfig = new chrome.cast.ApiConfig(request, sessionListener, function() {});
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
    	var words = loadWords();
    	$("card").each(function(index) {
    		this.textContent = words[index];
    	});
    }

   	function loadWords() {
        fetch("../words.txt").then(function(response) {
            var words = response.text().then(function(text) {
                return shuffle(text.split("\n"));
            });
            return words.splice(0, 25);
        });   		
   	}

    function shuffle(arr) {
        var i = 0;
        var j = 0;
        var temp = null;

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    resetBoard();
});