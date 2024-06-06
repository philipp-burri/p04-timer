const inputDays = document.getElementById('inputDays');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const countdownElement = document.getElementById('countdown');


let countdownInterval; //deklariert die variable countdownInterval
let totalSeconds;       // variable für sekunden
const alarmSound = new Audio('/audio/downlifiting-synth_125bpm_A_minor.wav');
const clickSound = new Audio ('/audio/ping-bing_E_major.wav');
const tickSound = new Audio ('/audio/clock-ticking-natural-room-verb-17249.mp3');
tickSound.loop = true; 
tickSound.volume = 1.0; 





startButton.addEventListener('click', startCountdown); //führt startbutton aus mit click
stopButton.addEventListener('click', stopCountdown);    // führt stopbutton aus ""
resetButton.addEventListener('click', resetCountdown); // führt resetbutton aus ""


function startCountdown() {                             // funktion um startbutton auszuführen
let daysInput = document.getElementById('inputDays')    // greift input aus html
let days = daysInput.value *60 *60 *24;                 // berechnung anzahl tagen in sekunden

let hoursInput = document.getElementById('inputHours')
let hours = hoursInput.value  * 60 * 60;

let minutesInput = document.getElementById('inputMinutes')
let minutes = minutesInput.value * 60;

let secondsInput = document.getElementById('inputSeconds')
let seconds = secondsInput.value;


totalSeconds = days + hours + minutes + seconds;        //sekunden
countdownInterval = setInterval(countdown, 1000);       
    clickSound.play()
    tickSound.play()
}


function countdown(){
if (totalSeconds > 0) {     
totalSeconds--;             // decrement sekunden für countdown
let days = Math.floor(totalSeconds / (60 * 60 * 24)).toString().padStart(2, '0');       //rechnet sekunden in d,h,m wieder um
let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, '0');   
let minutes = Math.floor((totalSeconds % (60 * 60)) / 60).toString().padStart(2, '0');
let seconds = Math.floor(totalSeconds % 60) .toString().padStart(2, '0');

countdownElement.innerHTML = `${days}:  ${hours}:${minutes} :${seconds}`;       // display countdown in HTML

if (totalSeconds === 0) {
    tickSound.pause();
 }
}else {
    clearInterval(countdownInterval);       //stoppt countdown bei 0
        alarmSound.play()
        tickSound.pause()
}
}


function stopCountdown(){           //führt die funktion stopCountdown aus wenn stopp-button gedrückt wird

clearInterval(countdownInterval);   //stopp countdown intervall
alarmSound.pause();
alarmSound.currentTime = 0;
tickSound.pause();
tickSound.currentTime = 0;
}


function resetCountdown(){      //führt reset funktion mit resetbutton

clearInterval(countdownInterval);
totalSeconds = 0;               // setzt timer auf 0 züruck
countdownElement.innerHTML = '00: 00:00 :00';   //setzt id countdown zurück
inputDays.value = '';           //setzt eingabefeld zurück
inputHours.value = '';
inputMinutes.value = '';
inputSeconds.value = '';
alarmSound.pause();
alarmSound.currentTime = 0;
tickSound.pause();
tickSound.currentTime = 1;
}


function toggleMute() {                 // mutebutton 
tickSound.muted = !tickSound.muted;     //mute/unmute
alarmSound.muted = !alarmSound.muted;
clickSound.muted = !clickSound.muted;
const muteButton = document.getElementById('mute-unmute');
muteButton.classList.toggle('muted');   
  }

  document.addEventListener('keydown', function(event) {    //funktion entertaste aktivierung startbutton
    if (event.key === 'Enter') {
      startButton.click();
    } 
    
  });



