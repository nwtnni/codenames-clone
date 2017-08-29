$(function() {
    var appID = "28E04352";
    var resetNamespace = "urn:x-cast:codenames.reset";
    var updateNamespace = "urn:x-cast:codenames.update";
    var session = null;

    var words = null;
    var blueTeam = null;
    var redTeam = null;
    var assassin = null;

    var currentBlue = null;
    var selectedCards = null;

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
    }

    function onError(message) {
        console.log(message);
    }

    function initializeBoard() {
        resetWords();
        resetTeams();
        selectedCards = [];

        displayCurrent();
        displayTeams();
    }

    function resetTeams() {
        $(".card").removeClass("blue-team red-team assassin");
        var seed = _.shuffle(_.range(25));
        currentBlue = (Math.random() > 0.5);

        blueTeam = seed.splice(0, 7);
        redTeam = seed.splice(0, 7);
        assassin = seed.splice(0, 1);
        currentBlue ? blueTeam.push(seed[0]) : redTeam.push(seed[0]);
    }

    function resetWords() {
        fetch("../words.txt").then(function(response) {
            response.text().then(function(text) {
                parseWords(text);
                $(".card").text("");
                displayWords();
            });
        });
    }

    function parseWords(text) {
        words = _.shuffle(text.split("\n")).splice(200, 25);
    }

    function displayCurrent() {
        $(".team-indicator").removeClass().addClass(currentBlue ? "blue-team" : "red-team");
    }

    function displayTeams() {
        $(".card").addClass(function(index, currentClassName) {
            if (blueTeam.includes(index)) {
                return "blue-team";
            } else if (redTeam.includes(index)) {
                return "red-team";
            } else if (assassin.includes(index)) {
                return "assassin";
            }
        });
    }

    function displayWords() {
        $(".card").each(function(index) {
            this.textContent = words[index];
        });
    }

    initializeBoard();
});