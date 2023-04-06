const options = document.querySelectorAll('.game-option');
const resultText = document.querySelector('#result-text');
const playerScoreText = document.querySelector('#player-score');
const computerScoreText = document.querySelector('#computer-score');
const resetButton = document.querySelector('#reset-button');

let playerScore = 0;
let computerScore = 0;

// Play the game when a game option is clicked
options.forEach(option => {
    option.addEventListener('click', () => {
        const playerChoice = option.id;
        const computerChoice = computerPlay();
        const result = playRound(playerChoice, computerChoice);
        displayResult(result, playerChoice, computerChoice);
        updateScore(result);
        checkEndGame();
    });
});

// Generate a random computer choice
function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner of the round
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (playerChoice === 'rock' && computerChoice === 'scissors' ||
               playerChoice === 'paper' && computerChoice === 'rock' ||
               playerChoice === 'scissors' && computerChoice === 'paper') {
        return 'win';
    } else {
        return 'lose';
    }
}

// Display the result of the round
function displayResult(result, playerChoice, computerChoice) {
    if (result === 'draw') {
        resultText.textContent = `You both chose ${playerChoice}. It's a draw!`;
    } else if (result === 'win') {
        resultText.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}. You win!`;
    } else {
        resultText.textContent = `You chose ${playerChoice} and the computer chose ${computerChoice}. You lose!`;
    }
}

// Update the score
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreText.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreText.textContent = computerScore;
    }
}

// Check if the game has ended
function checkEndGame() {
    if (playerScore === 5) {
        resultText.textContent = 'You win the game!';
        disableGame();
    } else if (computerScore === 5) {
        resultText.textContent = 'The computer wins the game!';
        disableGame();
    }
}

// Disable the game after it has ended
function disableGame() {
    options.forEach(option => {
        option.removeEventListener('click', () => {});
    });
    resetButton.style.display = 'block';
}

// Reset the game
resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    resultText.textContent = 'Make your move...';
    options.forEach(option => {
        option.addEventListener('click', () => {
            const playerChoice = option.id;
            const computerChoice = computerPlay();
            const result = playRound(playerChoice, computerChoice);
            displayResult(result, playerChoice, computerChoice);
            updateScore(result);
            checkEndGame();
        });
    });
    resetButton.style.display = 'none';
});
