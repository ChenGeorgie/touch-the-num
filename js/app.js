'use strict'

// create the variablue use.
var gInterval;
var gNumbers;
var rowAndCell;
var boardSize = 16;
var gCounterUserStep = 1;
var sizeShowOnTimer;

function init() {
    gInterval = clearInterval(gInterval);
    renderBaord();
}


function renderBaord() {
    // count of the user get sucssec.
    gCounterUserStep = 1;

    // get the board size.
    var gNumbers = getNumForBoard(boardSize);
    // get over again in the number and shuffle.
    var gNums = shuffle(gNumbers);

    var rowAndCell = Math.sqrt(gNumbers.length);

    // new game.
    var strNextNumber = `<button class="new-game-btn" onclick="newGame(this)">New Game</button>`;

    // display the levels
    var strLevel = `<button onclick="setLevel('easy')" class="btn easy">easy</button>`;
    strLevel += `<button onclick="setLevel('hard')" class="btn hard">hard</button>`;
    strLevel += `<button onclick="setLevel('extreme')" class="btn extreme">extreme</button>`;
    // display the next number.
    var strHtml = ``;
    strNextNumber += `<div class="next-number">Next Number:<span>1</span></div>`
    // display the timer.
    var strTimer = `<id="timer">Lets Do It!!! 🤙🤙🤙 </div>`;
    //display the board.
    for (var i = 0; i < rowAndCell; i++) {

        strHtml += `<tr>`;
        for (var j = 0; j < rowAndCell; j++) {
            strHtml += `<td onclick="cellClicked(this)" >${gNums.pop()}</td>`

        }

        // <div id="time">01:00</div>

        strHtml += `</tr>`

    }

    // catch the element from the dom.
    var startGame = document.querySelector('.new-game');
    var choseLevel = document.querySelector('.chose-level');
    var timer = document.querySelector('#timer');
    var container = document.querySelector('.container');


    //update the dom
    startGame.innerHTML = strNextNumber;
    choseLevel.innerHTML = strLevel;
    timer.innerHTML = strTimer;
    container.innerHTML = strHtml;

    // change the first button to know where to click.
    var allTds = document.querySelectorAll('td');
    for (var i = 0; i < allTds.length; i++) {
        if (+allTds[i].innerHTML === 1) {
            allTds[i].style.backgroundColor = '#18dafcc9';

        }
    }
}

function setLevel(el) {
    switch (el) {
        case 'easy':
            boardSize = 16;
            break;
        case 'hard':
            boardSize = 25;
            break;
        case 'extreme':
            boardSize = 36;

    }
    init()
}


function getNumForBoard(num) {
    var ar = [];
    for (var i = 1; i <= num; i++) {

        ar.push(i);
    }
    num = ar;
    return num;
}

function cellClicked(clickedNum) {

    // run the timer only if user click on the first bottom.
    if (gCounterUserStep === 1 && +clickedNum.innerHTML === 1) {
        timer();
    }
    // when user click on the right option.
    if (+clickedNum.innerHTML === gCounterUserStep) {
        showNextNumber();
        clickedNum.style.backgroundColor = 'black';
        clickedNum.style.color = 'white';
        // check for win
        if (gCounterUserStep === boardSize) {
            // gCounterUserStep = 0;
            gameOver();
            return;
        };
        ++gCounterUserStep;
    }
}

function showNextNumber() {
    var span = document.querySelector('.next-number span');
    span.innerHTML = gCounterUserStep + 1;
}

function newGame() {
    init();
}

function gameOver() {

    alert(`You Score: ${document.querySelector("#timer").innerHTML}`);
    init();
    
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// timer in milisecond;
function timer() {
    var startTime = Date.now();
    gInterval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        document.querySelector("#timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 100);
}

