let cells = [...document.querySelectorAll("ul li")];
let move = 0;
let moveCount = document.querySelector(".move .move-count");
let sec = 0;
let mySec = document.querySelector(".sec");
let min = 0;
let myMin = document.querySelector(".min");
let doubleClick = [];
let winner = [];
let winnerContainer = document.querySelector("section.winner-container");
let ul = document.querySelector("ul");
let flag = true;
let myTime = "";
let close = document.querySelector('.close-btn');

// Random card
shuffle(cells);

// Show card first
for (let cell of cells) {
    setTimeout(() => {
        cell.classList.remove("show")
    }, 3000);
    ul.appendChild(cell);
    cell.addEventListener("click", game);
}


function game() {
    this.classList.add("show");
    doubleClick.push(this);
    // Time
    if (flag) {
        myTime = setInterval(() => {
            sec++;
            mySec.textContent = sec;
            if (sec == 60) {
                min++;
                myMin.textContent = min;
                sec = 0
            }
        }, 1000);
        flag = false;
    }
    // Move
    if (doubleClick.length == 2) {
        move++;
        moveCount.textContent = move
        checkMatch();
    }
}

// Check match card
function checkMatch() {
    if (doubleClick[0].innerHTML == doubleClick[1].innerHTML) {
        success();
    } else {
        failed();
    }
}

// Match card
function success() {
    doubleClick[0].classList.add("match");
    doubleClick[1].classList.add("match");
    winner.push(doubleClick[0], doubleClick[1]);
    if (winner.length == 16) {
        winGame();
    }
    doubleClick = [];
}

// Unmatch card
function failed() {
    doubleClick[0].classList.add("unmatch");
    doubleClick[1].classList.add("unmatch");
    for (const cell of cells) {
        cell.classList.add("disable");
    }
    setTimeout(() => {
        doubleClick[0].classList.remove("unmatch", "show");
        doubleClick[1].classList.remove("unmatch", "show");
        doubleClick = [];
        for (const cell of cells) {
            cell.classList.remove("disable");
        }
    }, 2000)
}

// Winner
function winGame() {
    winnerContainer.classList.add("done");
    clearInterval(myTime);
}
// Close Winner Section
close.addEventListener('click',()=>{
    winnerContainer.style.display='none';
    location.reload();

});