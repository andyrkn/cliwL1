// --------------------cache meme----------------------
let wrapper;
let buttons;
// ----------------------------------------------------
let cardsList = [];
let ithSelectedCard = 0;

let currentRound = 0;

let secondsLevel = 5;
let secondsLeft = 0;
let numberOfCards = 2;

let secondsLeftDisplay = 5;
let streakDisplay = 0;

// painting order
let orderIndex = 0;
// time in ms
const fadeoutTimer = 1000;
var mainInterval, highlightingInterval;

function recolor() {
    for (let i = 0; i <= 8; i++) {
        buttons[i].style.backgroundColor = 'yellow';
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

    secondsLeftDisplay.innerHTML = secondsLevel;
}

function init() {
    // find a way to do this in a more elegant way
    // load elements once and prepare event delegation
    if (!wrapper) {
        document.getElementById('wrapper').addEventListener("click", function (e) { containerClick(e); })
        wrapper = document.getElementById('wrapper');
        // will have to compensate sometimes with buttonid - 1 since this will go from 0-8 and initially i've coded 1-9
        buttons = document.getElementsByClassName('btn');
        secondsLeftDisplay = document.getElementById('htime');
        streakDisplay = document.getElementById('streak');
    }

    recolor();
    changeCardsClickable('none');
    numberOfCards = 2 + Number(currentRound);
    secondsLeft = secondsLevel + Number(currentRound) / 2;
    ithSelectedCard = 0;
    cardsList = [];
    orderIndex = 0;
    secondsLeftDisplay.innerHTML = secondsLeft;
    streakDisplay.innerHTML = 'Streak: ' + currentRound;
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
    buttons[cardsList[0] - 1].style.backgroundColor = 'red';
    highlightingInterval = setInterval(highlightCard, fadeoutTimer);
}

function highlightCard() {
    // console.log(orderIndex + ' <- order index');
    buttons[cardsList[orderIndex] - 1].style.backgroundColor = 'yellow';

    if (orderIndex < cardsList.length - 1) {
        orderIndex = Number(orderIndex) + 1;
        buttons[cardsList[orderIndex] - 1].style.backgroundColor = 'red';
    }
    else {
        buttons[cardsList[orderIndex] - 1].style.backgroundColor = 'yellow';
        clearInterval(highlightingInterval);
        countdown();
    }
}

//card onclick event, set it as green and pass to checker.
function containerClick(event) {
    let buttonId = event.target.dataset.action;
    buttons[buttonId - 1].style.backgroundColor = 'green';
    addElement(buttonId);
}

// check if the card selected is correct, if not, stop the round and call reset
function addElement(buttonId) {
    // remove the color off the previous card
    if (ithSelectedCard > 0)
        buttons[cardsList[ithSelectedCard - 1] - 1].style.backgroundColor = 'yellow';

    // check if the order is correct
    if (cardsList[ithSelectedCard] == buttonId) {
        console.log(buttonId + ' click correct');
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
    wrapper.style.pointerEvents = incPointerEvent;
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
        if (Number(secondsLeft) <= 0) {
            clearInterval(mainInterval);
            alert('defeat');
            reset();
        } else {
            secondsLeft = Number(secondsLeft) - 1 + Number(pauseActive);
            secondsLeftDisplay.innerHTML = secondsLeft;
        }
    }, 1000);
}
