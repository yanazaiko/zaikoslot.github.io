
const slotSymbols = ["🎾", "🍓", "🪲", "🐠", "⭐", "🦋", "🌷"];

const resultMessage = document.getElementById("result");
const finalResult = document.getElementById("final-result");
const spinButton = document.getElementById("spin-button");
const startButton = document.querySelector(".start-btn");
let userName = "";
let winCount = 0;
let currentRound = 0;

function startGame() {
    userName = prompt("Enter your name to start:");
    if (!userName) {
        resultMessage.innerHTML = "Please enter a valid name to start.";
        return;
    }
    winCount = 0;
    currentRound = 0;
    resultMessage.innerHTML = `Welcome, ${userName}! Good luck!`;
    finalResult.innerHTML = "";
    spinButton.disabled = false;
    startButton.disabled = true;
}

function getRandomSymbol() {
    return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
}

function spin() {
    resultMessage.innerHTML = `Round ${currentRound + 1}: Spinning...`;
    const slots = [];
    currentRound++;

  
    resetSlotStyles();

 
    for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
            const slotId = `slot-${row}-${col}`;
            const symbol = getRandomSymbol();
            document.getElementById(slotId).textContent = symbol;
            slots.push(symbol);
        }
    }

    checkWin(slots);

    if (currentRound === 3) {
        endGame();
    }
}

function checkWin(slots) {
    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6] 
    ];

    let isWin = false;
    const winningSlots = []; 

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (slots[a] === slots[b] && slots[b] === slots[c]) {
            isWin = true;
            winningSlots.push(a, b, c);
            break;
        }
    }

    if (isWin) {
        winCount++;
        resultMessage.innerHTML = `🎉 You won round ${currentRound}! 🎉`;
        highlightWinningSlots(winningSlots); 
    } else {
        resultMessage.innerHTML = `Round ${currentRound} - Try again!`;
    }
}


function highlightWinningSlots(winningSlots) {
    winningSlots.forEach(index => {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const slotId = `slot-${row}-${col}`;
        document.getElementById(slotId).classList.add("highlight");
    });
}


function resetSlotStyles() {
    for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
            const slotId = `slot-${row}-${col}`;
            document.getElementById(slotId).classList.remove("highlight");
        }
    }
}

function endGame() {
    spinButton.disabled = true;
    startButton.disabled = false;
    resultMessage.innerHTML = "";
    finalResult.innerHTML = `${userName}, you won ${winCount} out of 3 rounds.`;
}
