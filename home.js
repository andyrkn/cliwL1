cardsList = [];
ithSelectedCard = 0;
secondsLevel = 5;
secondsLeft = 0;

currentRound = 0;
orderIndex = 0;

numberOfCards = 5;

// time in ms
fadeoutTimer = 1000;
var mainInterval, highlightingInterval;

function recolor() {
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.backgroundColor = 'yellow';
    }
}

function manageDifficultyLevels() {
    let elem = document.getElementById('sefselect');
    let diff = elem.options[elem.options.selectedIndex].innerText;

    if (diff == 'Easy') {
        fadeoutTimer = 1000;
        secondsLevel = 5;
    }
    if (diff == 'Normal') {
        fadeoutTimer = 700;
        secondsLevel = 4;
    }
    if (diff == 'Hard') {
        fadeoutTimer = 400;
        secondsLevel = 3;
    }

    document.getElementById('htime').innerHTML = secondsLevel;
}

function init() {
    recolor();
    //manageDifficultyLevels();
    changeCardsClickable('none');
    numberOfCards = 2 + Number(currentRound);
    secondsLeft = secondsLevel + Number(currentRound)/2;
    ithSelectedCard = 0;
    cardsList = [];
    orderIndex = 0;
    document.getElementById('htime').innerHTML = secondsLevel;
    document.getElementById('streak').innerHTML = 'Streak: ' + currentRound;
}

function reset() {
    currentRound = 0;
    init();
}

function start() {
    init();

    cardsList.push(Math.floor((Math.random() * 9) + 1));
    for (let i = 0; i < numberOfCards - 1; i++) {
        while (1) { // make sure we dont have the same card twice in a row
            let nr = Math.floor((Math.random() * 9) + 1);
            if (nr != cardsList[i]) {
                cardsList.push(nr);
                break;
            }
        }
    }
    console.log('new game start ' + cardsList.toString());


    // begin showing the card order
    document.getElementById('bt' + cardsList[0]).style.backgroundColor = 'red';
    highlightingInterval = setInterval(highlightCard, fadeoutTimer);
}

function highlightCard() {
    // console.log(orderIndex + ' <- order index');
    document.getElementById('bt' + cardsList[orderIndex]).style.backgroundColor = 'yellow';

    if (orderIndex < cardsList.length - 1) {
        orderIndex = Number(orderIndex) + 1;
        document.getElementById('bt' + cardsList[orderIndex]).style.backgroundColor = 'red';
    }
    else {
        document.getElementById('bt' + cardsList[orderIndex]).style.backgroundColor = 'yellow';
        clearInterval(highlightingInterval);
        countdown();
    }
}

//card onclick event, set it as green.
function c1(button) {
    document.getElementById(button.id).style.backgroundColor = 'green';
    addelement(button.id);
}

// check if the card selected is correct, if not, stop the round and call reset
function addelement(buttonId) {
    // remove the color off the previous card
    if (ithSelectedCard > 0)
        document.getElementById('bt' + cardsList[ithSelectedCard - 1]).style.backgroundColor = 'yellow';

    // extract id from button eg: { id = bt9 -> str = 9 }
    str = buttonId.substring(buttonId.length - 1, buttonId.length);
    // check if the order is correct
    if (cardsList[ithSelectedCard] == str) {
        console.log(str + ' click correct');
        if (ithSelectedCard == numberOfCards - 1) {
            // alert('you win'); 
            currentRound = Number(currentRound) + 1;
            clearInterval(mainInterval);
            start();
            return;
        }
        // move to the next card in line
        ithSelectedCard = Number(ithSelectedCard) + 1;
    } else {
        alert('wrong');
        clearInterval(mainInterval);
        reset();
        currentRound = 0;
    }
}

//set the cards clickable or not, with the help of 'all' and 'none'
function changeCardsClickable(incPointerEvent) {
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.pointerEvents = incPointerEvent;
    }
}

pauseActive = 0;
function pause() {
    pauseActive = 1;
    changeCardsClickable('none');
}

function resume() {
    pauseActive = 0;
    changeCardsClickable('all');
}

// fake a pause cause im bad at js, add +1(pauseActive) to the countdown so it looks like it froze but its not
function countdown() {
    // unlock the buttons and start the game
    changeCardsClickable('all');
    // main countdown responsable with the game
    mainInterval = setInterval(function () {
        if (Number(secondsLeft) == 0) {
            clearInterval(mainInterval);
            alert('defeat');
            reset();
        } else {
            secondsLeft = Number(secondsLeft) - 1 + Number(pauseActive);
            document.getElementById('htime').innerHTML = secondsLeft;
        }
    }, 1000);
}
