'use strict'
// global ver
var gNums = randomNumber()
var gBoard = creatGame()
var gNextLevel = 16
var gNextNumer 
var gInterval

//for time function
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function init(){
    gNextNumer = 1
    gNums = randomNumber()
    gBoard = creatGame()
    renderGame()
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    totalSeconds = 0;
    clearInterval(gInterval)
}

function level(){
    return [
        {id: 0, level: 16,}
    ]
}


/// click on difrent level to play
function nextLevel(number){
    gNextLevel = number   
    console.log(number)
    init()

}

// click on the number 1 the game will start
function cellClicked(elCell) {
    if (gNextNumer === 1) gInterval = setInterval(setTime, 1000)
    var numClicked = (Number(elCell.innerText))

    if (numClicked === gNextNumer) {
        elCell.style.backgroundColor = 'lawngreen';
        elCell.style.color = 'black'
        gNextNumer++

        if(gNextNumer > gNextLevel){
            var victory = confirm('Victory! play next level?')



            if(victory) nextLevel(25)
            
        }
    }

    if (gNextNumer === gNextLevel + 1){
        clearInterval(gInterval)
    }  
}

// render the game to css
function renderGame() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'  
        for (var j = 0; j < gBoard[0].length; j++) {
            strHTML += `<td data-i="${i}" onclick="cellClicked(this)"> ${gBoard[i][j]}</td>`           
        }  
        strHTML += '</tr>'; 
        console.log()
    }
    var elTabel = document.querySelector('.board');
    elTabel.innerHTML = strHTML;
}

// creat a rendom numbers for the bord and the lengt of the board
function randomNumber() {
    var nums = [];
    for (var i = 0; i < gNextLevel; i++) {
        nums.push(i + 1)       
    }
    return nums
}

// creat the board game
function creatGame(){
    gNums = randomNumber();
    shuffle(gNums);
    var board = [];
    var len = Math.sqrt(gNums.length)
    for (var i = 0; i < len; i++) {
        board[i] = [];
        for (var j = 0; j < len; j++) {
            board[i][j] = drawNum()          
        }        
    }
    return board
}


/// aid functions
function getRandomInt(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
}


function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

//time function
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
