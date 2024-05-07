const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const alertSound = document.getElementById('alert-sound');

let timeLeft = 1500; // 25 minuts en segons
let timerId;
let isPaused = false;
let isTimerRunning = false;

shortBreakButton.addEventListener('click', () => {
    startTimer(300); // 5 minuts en segons
    startButton.textContent = 'Pausar';
});

longBreakButton.addEventListener('click', () => {
    startTimer(900); // 15 minuts en segons
    startButton.textContent = 'Pausar';
});

function startTimer(duration) {
    clearInterval(timerId);
    timeLeft = duration;
    displayTime();
    timerId = setInterval(() => {
        timeLeft--;
        displayTime();
        if (timeLeft === 0) {
            clearInterval(timerId);
            alertSound.play();
        }
    }, 1000);
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!isTimerRunning) {
        startTimer(timeLeft);
        startButton.textContent = 'Pausar';
    } else {
        if (!isPaused) {
            clearInterval(timerId);
            isPaused = true;
            startButton.textContent = 'Reprendre';
        } else {
            startTimer(timeLeft);
            isPaused = false;
            startButton.textContent = 'Pausar';
        }
    }
    isTimerRunning = !isTimerRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timeLeft = 1500;
    displayTime();
    isPaused = false;
    startButton.textContent = 'Començar';
    isTimerRunning = false;
});
