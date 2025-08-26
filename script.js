let maxNumber = 12;
let timeLimit = 120;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentProblem = {};
let startTime = null;
let timerInterval = null;
let elapsedTime = 0;

const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const maxNumberInput = document.getElementById('max-number');
const timeLimitInput = document.getElementById('time-limit');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const restartBtn = document.getElementById('restart-btn');
const problemDisplay = document.getElementById('problem');
const answerInput = document.getElementById('answer-input');
const feedbackDisplay = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalScoreDisplay = document.getElementById('final-score');
const correctCountDisplay = document.getElementById('correct-count');
const incorrectCountDisplay = document.getElementById('incorrect-count');
const timeTakenDisplay = document.getElementById('time-taken');

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function generateProblem() {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    currentProblem = {
        num1: num1,
        num2: num2,
        answer: num1 * num2
    };
    problemDisplay.textContent = `${num1} × ${num2}`;
    answerInput.value = '';
    feedbackDisplay.textContent = '';
    feedbackDisplay.className = 'feedback';
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) return;
    
    if (userAnswer === currentProblem.answer) {
        score++;
        correctAnswers++;
        scoreDisplay.textContent = `Score: ${score}`;
        feedbackDisplay.textContent = '✓';
        feedbackDisplay.className = 'feedback correct';
    } else {
        incorrectAnswers++;
        feedbackDisplay.textContent = `✗ ${currentProblem.answer}`;
        feedbackDisplay.className = 'feedback incorrect';
    }
    
    setTimeout(() => {
        generateProblem();
        answerInput.focus();
    }, 500);
}

function startGame() {
    maxNumber = parseInt(maxNumberInput.value) || 12;
    timeLimit = parseInt(timeLimitInput.value) || 0;
    
    if (maxNumber < 1 || maxNumber > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    elapsedTime = 0;
    startTime = Date.now();
    
    scoreDisplay.textContent = 'Score: 0';
    
    if (timeLimit > 0) {
        timerDisplay.textContent = `Time: ${formatTime(timeLimit)}`;
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        timerDisplay.textContent = 'Time: ∞';
        timerInterval = setInterval(() => {
            elapsedTime++;
        }, 1000);
    }
    
    showScreen(gameScreen);
    generateProblem();
    answerInput.focus();
}

function updateTimer() {
    if (timeLimit > 0) {
        const remainingTime = Math.max(0, timeLimit - Math.floor((Date.now() - startTime) / 1000));
        timerDisplay.textContent = `Time: ${formatTime(remainingTime)}`;
        
        if (remainingTime === 0) {
            endGame();
        }
    }
    elapsedTime++;
}

function endGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    finalScoreDisplay.textContent = score;
    correctCountDisplay.textContent = correctAnswers;
    incorrectCountDisplay.textContent = incorrectAnswers;
    timeTakenDisplay.textContent = formatTime(timeTaken);
    
    showScreen(resultsScreen);
}

function resetGame() {
    showScreen(setupScreen);
    maxNumberInput.focus();
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
restartBtn.addEventListener('click', resetGame);

answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

maxNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        timeLimitInput.focus();
    }
});

timeLimitInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});