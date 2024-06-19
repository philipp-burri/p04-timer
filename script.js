const inputDays = document.getElementById('inputDays');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const countdownElement = document.getElementById('countdown');
let daysInput = document.getElementById('inputDays');
let hoursInput = document.getElementById('inputHours');
let minutesInput = document.getElementById('inputMinutes');
let secondsInput = document.getElementById('inputSeconds');
const muteButton = document.getElementById('mute-unmute');

let countdownInterval;
let totalSeconds;
let remainingSeconds;

const alarmSound = new Audio('/audio/downlifiting-synth_125bpm_A_minor.wav');
const clickSound = new Audio('/audio/ping-bing_E_major.wav');
const tickSound = new Audio('/audio/clock-ticking-natural-room-verb-17249.mp3');
tickSound.loop = true;

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);
resetButton.addEventListener('click', resetCountdown);

function parseInput(value) {
  return parseInt(value) || 0;
}

function startCountdown() {
  if (remainingSeconds === undefined) {
    const days = parseInput(daysInput.value) * 60 * 60 * 24;
    const hours = parseInput(hoursInput.value) * 60 * 60;
    const minutes = parseInput(minutesInput.value) * 60;
    const seconds = parseInput(secondsInput.value);
    totalSeconds = days + hours + minutes + seconds;
    remainingSeconds = totalSeconds;
  }

  countdownInterval = setInterval(countdown, 1000);
  clickSound.play();
  tickSound.play();
}

function countdown() {
  if (remainingSeconds > 0) {
    remainingSeconds--;
    const days = Math.floor(remainingSeconds / (60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(remainingSeconds % 60).toString().padStart(2, '0');

    countdownElement.innerHTML = `${days}:  ${hours}:${minutes} :${seconds}`;

    if (remainingSeconds === 0) {
      tickSound.pause();
    }
  } else {
    clearInterval(countdownInterval);
    alarmSound.play();
    tickSound.pause();
  }
}

function stopCountdown() {
  clearInterval(countdownInterval);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  tickSound.pause();
  tickSound.currentTime = 0;
}

function resetCountdown() {
  clearInterval(countdownInterval);
  remainingSeconds = 0;
  countdownElement.innerHTML = '00: 00:00 :00';
  inputDays.value = '';
  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';
  alarmSound.pause();
  alarmSound.currentTime = 0;
  tickSound.pause();
  tickSound.currentTime = 1;
}

function toggleMute() {
  tickSound.muted = !tickSound.muted;
  alarmSound.muted = !alarmSound.muted;
  clickSound.muted = !clickSound.muted;
  muteButton.classList.toggle('muted');
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    startButton.click();
  }
});