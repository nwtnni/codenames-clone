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
        fetch("../words.txt").then(function(response) {
            response.text().then(function(text) {
                words = shuffle(text.split("\n"));
                console.log(words);
                display(words);
            });
        });   		
   	}

   	function display(words) {
   		$("card").each(function(index) {
   			console.log("Word: " + words[index] + " at index " + index);
    		this.textContent = words[index];
    	});
   	}

    function shuffle(arr) {
        var i = 0;
        var j = 0;
        var temp = null;

        for (i = arr.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    resetBoard();
});