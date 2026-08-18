let gameSeq = [];
let userSeq = [];

const btns = ["pink", "yellow", "green", "purple"];

let started = false;
let level = 0;
let acceptingInput = false;

const h2 = document.querySelector("h2");

// Start Game
document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        gameSeq = [];
        userSeq = [];
        level = 0;
        levelUp();
    }
});

// Flash Effects
function flash(btn, className) {
    btn.classList.add(className);

    setTimeout(() => {
        btn.classList.remove(className);
    }, 200);
}

// Level Up
function levelUp() {
    acceptingInput = false;
    userSeq = [];
    level++;

    h2.innerText = Level ${level};

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];

    const randBtn = document.querySelector(.${randColor});

    gameSeq.push(randColor);

    flash(randBtn, "flash");

    // Allow user input after Simon flashes
    setTimeout(() => {
        acceptingInput = true;
    }, 300);
}

// Check Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {

        // Complete sequence is correct
        if (userSeq.length === gameSeq.length) {
            acceptingInput = false;

            setTimeout(() => {
                levelUp();
            }, 800);
        }

    } else {
        gameOver();
    }
}

// Game Over
function gameOver() {
    started = false;
    acceptingInput = false;

    h2.innerHTML =
        Game Over! Your score was <b>${level}</b><br>Press any key to restart;

    document.body.style.backgroundColor = "red";

    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 150);

    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Button Click
function btnPress() {

    // Don't allow button clicks before game starts
    // or while Simon is showing the sequence
    if (!started || !acceptingInput) {
        return;
    }

    const btn = this;

    flash(btn, "userflash");

    const userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add Event Listeners
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});
