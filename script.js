let gameSeq = [];
let userSeq = [];

const btns = ["pink", "yellow", "green", "purple"];

let started = false;
let level = 0;
let acceptingInput = false;
let score = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;

const h2 = document.querySelector("h2");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score");

highScoreDisplay.innerText = highScore;

// Start Game
document.addEventListener("keydown", () => {
    if (!started) {
        startGame();
    }
});

// Start Game Function
function startGame() {
    started = true;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;

    scoreDisplay.innerText = score;
    h2.innerText = "Get Ready...";

    setTimeout(levelUp, 500);
}

// Flash Effects
function flash(btn, className) {
    btn.classList.add(className);

    setTimeout(() => {
        btn.classList.remove(className);
    }, 200);
}

// Level Up
function levelUp() {
    userSeq = [];
    acceptingInput = false;
    level++;

    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];

    gameSeq.push(randColor);

    playSequence();
}

// Play Complete Sequence
async function playSequence() {

    for (let color of gameSeq) {

        const btn = document.querySelector(`.${color}`);

        flash(btn, "flash");

        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    }

    acceptingInput = true;
}

// Check Answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        score++;
        scoreDisplay.innerText = score;

        if (score > highScore) {
            highScore = score;

            highScoreDisplay.innerText = highScore;

            localStorage.setItem("simonHighScore", highScore);
        }

        if (userSeq.length === gameSeq.length) {
            acceptingInput = false;

            setTimeout(levelUp, 800);
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
        `Game Over! Your score was <b>${score}</b><br>Press any key to restart`;

    document.body.style.backgroundColor = "red";

    setTimeout(() => {
        document.body.style.backgroundColor = "#f5f5f5";
    }, 150);

    reset();
}

// Button Click
function btnPress() {

    if (!started || !acceptingInput) return;

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

// Reset Game
function reset() {
    started = false;
    acceptingInput = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
