let gameSeq = [];
let userSeq = [];

const btns = ["pink", "yellow", "green", "purple"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");

// Start Game
document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash Effects
function flash(btn, className) {
    btn.classList.add(className);
    setTimeout(() => btn.classList.remove(className), 200);
}

// Level Up Logic
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    flash(randBtn, "flash");
}

// Check Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button Click
function btnPress() {
    if(! started) return;
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
    gameSeq = [];
    userSeq = [];
    level = 0;
}
