$(function() {
    var appID = "28E04352";
    var namespace = "urn:x-cast:codenames.update";
    var session = null;
    var board = null;

    function Board(words) {
        this.words = words;
        this.selectedCards = [];

        var seed = _.shuffle(_.range(25));
        this.currentBlue = (Math.random() > 0.5);
        this.blue = seed.splice(0, 7);
        this.red = seed.splice(0, 7);
        this.assassin = seed.splice(0, 1);
        this.currentBlue ? this.blue.push(seed[0]) : this.red.push(seed[0]);
    }

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

    function initialize() {
      clearBoard();
      createBoard();
    }

    function clearBoard() {
        $(".card").text("");
        $(".card").removeClass("blue-team red-team assassin");
    }

    function createBoard() {
      fetch("../words.txt").then(function(response) {
            response.text().then(function(text) {
                parseWords(text);
                displayBoard();
            });
        });
    }

    function displayBoard() {
      displayCurrent();
      displayTeams();
      displayWords();
    }

    function parseWords(text) {
        var words = _.shuffle(text.split("\n")).splice(200, 25);
        board = new Board(words);
    }

    function displayCurrent() {
        $(".team-indicator").removeClass("blue-team red-team").addClass(board.currentBlue ? "blue-team" : "red-team");
        $(".team-indicator").text(board.currentBlue? "Blue Team" : "Red Team");
    }

    function displayTeams() {
        $(".card").addClass(function(index, currentClassName) {
            if (board.blue.includes(index)) {
                return "blue-team";
            } else if (board.red.includes(index)) {
                return "red-team";
            } else if (board.assassin.includes(index)) {
                return "assassin";
            }
        });
    }

    function displayWords() {
        $(".card").each(function(index) {
            this.textContent = board.words[index];
        });
    }

    initialize();
});