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
    if (session == null) {
        session = cast.framework.CastContext.getInstance().getCurrentSession();
    }
    session.sendMessage(namespace, board);
}

function toggleCurrent() {
    board.currentBlue = !board.currentBlue;
    displayCurrent();
}

$(document).ready(function() {
    window['__onGCastApiAvailable'] = function(isAvailable) {
        if (isAvailable) {
            initializeCastApi();
        }
    };

    function initializeCastApi() {
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: appID,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
    }

    function initialize() {
      clearBoard();
      createBoard();
    }

    initialize();
});