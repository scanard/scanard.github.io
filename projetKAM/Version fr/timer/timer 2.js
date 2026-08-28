const timerDisplay = document.getElementById('timer-display');
const pauseButton = document.getElementById('pause-button');
const overlay = document.getElementById('overlay');
const TIMER_DURATION = 25 * 60 * 1000; // 25 minutes in milliseconds

let intervalId;
let paused = false;
let remainingTime = TIMER_DURATION;

function startTimer() {
    const endTime = Date.now() + remainingTime;
    localStorage.setItem('timerEndTime', endTime);
    updateTimer();
}

function updateTimer() {
    const endTime = localStorage.getItem('timerEndTime');
    if (!endTime) return;

    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
        timerDisplay.textContent = '00:00';
        localStorage.removeItem('timerEndTime');
        clearInterval(intervalId);
    } else {
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (!paused) {
            requestAnimationFrame(updateTimer);
        }
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(intervalId);
        const endTime = localStorage.getItem('timerEndTime');
        remainingTime = endTime - Date.now();
        overlay.style.display = 'block';
        pauseButton.textContent = 'Resume Timer';
    } else {
        paused = false;
        localStorage.setItem('timerEndTime', Date.now() + remainingTime);
        overlay.style.display = 'none';
        pauseButton.textContent = 'Pause Timer';
        updateTimer();
    }
}

pauseButton.addEventListener('click', pauseTimer);

document.addEventListener('DOMContentLoaded', () => {
    const endTime = localStorage.getItem('timerEndTime');
    if (endTime) {
        remainingTime = endTime - Date.now();
        if (remainingTime > 0) {
            updateTimer();
        } else {
            timerDisplay.textContent = '00:00';
            localStorage.removeItem('timerEndTime');
        }
    } else {
        startTimer();
    }
});
