let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let HighScore = 0;
let level = 0;
let idx = level - 1;

let startBtn = document.getElementById("startbtn");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let player = prompt("Enter player name :");

startBtn.addEventListener("click", function() {
    if (started == false) {
        started = true;
        levelUp();
    }
});

// Add a class flash to button which was triggered by levelUp function
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function flashSequence() {
    let i = 0;
    const interval = setInterval(function() {
        const color = gameSeq[i];
        const btn = document.querySelector(`.${color}`);
        btnFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 800); // Increased delay to 800ms
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    startBtn.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Change from 3 to 4 for random selection
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    flashSequence();
}

function backgroundFlash() {
    let body = document.querySelector("body");
    body.classList.add("BgFlash");
    setTimeout(function() {
        body.classList.remove("BgFlash");
    }, 100);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.style.color = "red";
        h2.innerText = `Game Over ! ${player} score is ${level - 1}`;
        if ((level - 1) > HighScore) {
            HighScore = (level - 1);
            h3.innerText = `Highscore : ${HighScore} by ${player}`;
        }
        backgroundFlash();
        startBtn.innerText = "START";
        reset();
    }
}

function btnPress(event) {
    event.preventDefault();
    let btn = this;
    let bn = btns[btn.innerText - 1]; // This needs to be fixed for accurate button press handling
    userSeq.push(bn);
    checkAns(userSeq.length - 1);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Add listener for all buttons
let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    if (isTouchDevice) {
        btn.addEventListener("touchstart", function(event) {
            event.preventDefault();
            event.stopPropagation();
            btnPress.call(btn, event);
        }, { passive: false });
    } else {
        btn.addEventListener("click", btnPress);
    }
});
