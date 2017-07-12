var newGameElem = document.getElementById('js-newGameElement'),
    newGameBtn = document.getElementById('js-newGameButton'),
    pickElem = document.getElementById('js-playerPickElement'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() {
    playerPick('kamień')
});
pickPaper.addEventListener('click', function() {
    playerPick('papier')
});
pickScissors.addEventListener('click', function() {
    playerPick('nożyce')
});

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
function setGamePoints () {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function getComputerPick() {
    var possiblePick = ['kamień', 'papier', 'nożyce'];
    return possiblePick[Math.floor(Math.random()*3)];
}
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; //remis
    } else if ( (computerPick == 'kamień' && playerPick == 'nożyce') || (computerPick == 'nożyce' && playerPick == 'papier') || (computerPick == 'papier' && playerPick == 'kamień')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'Wygrana!';
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Wygrana!';
        computer.score++;
        setGamePoints();
    } else {
        playerResultElem.innerHTML = 'Remis';
        computerResultElem.innerHTML = 'Remis';
    }
}
function winner () {
    if (computer.score == 10) {
        alert('Wygrał komputer!');
        gameState = 'ended';
        setGameElements();
    }
    else if (player.score == 10) {
        alert('Wygrałeś!');
        gameState = 'ended';
        setGameElements();
    }
}

setGameElements ();

function newGame () {
    player.name = prompt('Graczu wpisz swoje imię');
    if (player.name) {
        playerNameElem.innerHTML = player.name;
        player.score = computer.score = 0;
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';
        playerPickElem.innerHTML = computerPickElem.innerHTML = '';
        gameState = 'started';
        setGameElements();
        setGamePoints();
    }
}
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    winner();
}
