let gameSeq = [];
let userSeq = [];

let btns=["red","yellow","green","blue"];

let started = false;
let HighScore =0;
let level = 0 ;
let idx = level-1;

let startBtn = document.getElementById("startbtn");
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

let player = prompt("Enter player name :");
startBtn.addEventListener("click",function(){
    if(started== false){
        // console.log("Game started");
        started=true;
        levelUp();
    }
});

// Add a class flass to button which was trigged by levelUp function
function btnPress(){
    event.preventDefault();
    if (this.disabled) return;  // Prevent touch if buttons are disabled during sequence flash

    let btn = this;
    let bn = btns[btn.innerText - 1];
    userSeq.push(bn);
    checkAns(userSeq.length - 1);
}

function flashSequence(){
    let i=0;
    // Disable button interactions during the flashing
    allBtns.forEach(btn => btn.disabled = true);
    const interval = setInterval(function(){
        const color = gameSeq[i];
        const btn = document.querySelector(`.${color}`);
        btnFlash(btn);
        i++;
        if(i >= gameSeq.length){
            clearInterval(interval);
            // Re-enable button interactions after flashing
            allBtns.forEach(btn => btn.disabled = false);
        }
    }, 600);
}


// Trigreed the random colour and pass in btnFlash function
function levelUp(){
  userSeq=[];
level++
h2.innerText =`Level ${level}`;
    startBtn.innerText = `Level ${level}`; // Update this during level-up.


let randIdx =Math.floor(Math.random()*3);
let randColor =btns[randIdx];
let randBtn =document.querySelector(`.${randColor}`);
// console.log(randIdx);
// console.log(randColor);
// console.log(randBtn);

gameSeq.push(randColor);
console.log(gameSeq);
flashSequence();

// btnFlash(randBtn);

}

function backgroundFlash(){
    let body =document.querySelector("body");
    body.classList.add("BgFlash");
    setTimeout(function(){
      body.classList.remove("BgFlash");
    },100);
}

function checkAns(idx){
  // let idx = level-1;
  if (userSeq[idx]=== gameSeq[idx]){
    if(userSeq.length=== gameSeq.length){
      setTimeout(levelUp,500);
      // levelUp();
    }
    // console.log("Same value");
  }
  else{
    h2.style.color="red";
    h2.innerText =`Game Over ! ${player} score is ${level-1}`;
    if((level-1)>HighScore){
      HighScore=(level-1);
      h3.innerText=` Highscore : ${HighScore} by ${player}`;
    }
    backgroundFlash();
    startBtn.innerText="START";
      
    reset();
  }
}

// Checked which button pressed by user.
function btnPress(){
      event.preventDefault();
    let btn=this;
    // console.log(btn);
    let bn =btns[btn.innerText-1]
    // console.log(`User pressed ${bn} button`);

    // userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(bn);
    // console.log(userSeq);

    checkAns(userSeq.length-1);
}


function reset(){
  started=false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// Add listern over all btn having class btn
let isTouchDevice  ="onTouchstart" in window || navigator.maxTouchPoints > 0;

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
  if( isTouchDevice){
    btn.addEventListener("touchstart", btnPress,{ passive : false});
    btn.addEventListener("touchend",e => e.preventDefault(), { passive : false});
  }
  else{
    btn.addEventListener("click",btnPress);
  }
  
});
