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

    if (this.currentBlue) {
        this.blue.push(seed[0]);
    } else {
        this.red.push(seed[0]);
    }
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
        } else {
            return "civilian";
        }
    });
}

function displayWords() {
    $(".card").each(function(index) {
        var card = this;
        card.textContent = board.words[index];
        card.onclick = function() {
            if (!board.selectedCards.includes(index)) {
                board.selectedCards.push(index);
                $(card).addClass("selected");
            }
        };
    });
}

function sendUpdate() {
    if (session != null) {
        console.log("Session is not null!")
        session.sendMessage(namespace, board, onSuccess.bind(this, 'Message sent: ' + message), onError);
    }
    else {
        chrome.cast.requestSession(function(e) {
            session = e;
            console.log("Session was null, but is now " + session.sessionId);
            session.sendMessage(namespace, board, onSuccess.bind(this, 'Message sent: ' + message), onError);
        }, onError);
    }
}

function updateReceiver() {
  session.sendMessage(namespace, JSON.stringify(board)).then(function(response) {
    console.log("Successfully sent message.");
  });
}

function toggleCurrent() {
    board.currentBlue = !board.currentBlue;
    displayCurrent();
}

$(document).ready(function() {
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
        session.addUpdateListener(sessionUpdateListener);
        updateReceiver();
        console.log(JSON.stringify(board));
        console.log("Found a session!");
    }

    function sessionUpdateListener(isAlive) {
        var message = isAlive ? 'Session updated: ' : 'Session removed: ';
        console.log(message + session.sessionId);
        session = isAlive ? session : null;
    }

    function onInitSuccess() {
        console.log("Successfully initialized");
    }

    function onError(message) {
        console.log('Error: ' + JSON.stringify(message));
    }

    function onSuccess(message) {
        console.log('Success: ' + JSON.stringify(message))
    ;}

    function initialize() {
      clearBoard();
      createBoard();
    }

    initialize();
});