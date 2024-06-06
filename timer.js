document.addEventListener('DOMContentLoaded', function() {
    // Get the input fields and buttons
    const inputDays = document.getElementById('inputDays');
    const inputHours = document.getElementById('inputHours');
    const inputMinutes = document.getElementById('inputMinutes');
    const inputSeconds = document.getElementById('inputSeconds');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const countdownElement = document.getElementById('countdown');
  
    // Add event listener to the start button
    startButton.addEventListener('click', startCountdown);
  
    // Variable to store the countdown interval
    let countdownInterval;
  
    function startCountdown() {
      // Get the values from the input fields
      const days = parseInt(inputDays.value) || 0;
      const hours = parseInt(inputHours.value) || 0;
      const minutes = parseInt(inputMinutes.value) || 0;
      const seconds = parseInt(inputSeconds.value) || 0;
  
      // Calculate the total number of seconds
      let totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  
      // Clear any existing countdown
      clearInterval(countdownInterval);
  
      // Update the countdown every second
      countdownInterval = setInterval(() => {
        // Decrement the total seconds
        totalSeconds--;
  
        // Calculate the remaining days, hours, minutes, and seconds
        const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
        const remainingHours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const remainingSeconds = totalSeconds % 60;
  
        // Update the countdown element with the remaining time
        countdownElement.textContent = `${remainingDays}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
  
        // Check if the countdown has finished
        if (totalSeconds <= 0) {
          clearInterval(countdownInterval);
          countdownElement.textContent = 'Countdown finished!';
        }
      }, 1000);
    }
  
    // Add event listener to the stop button
    stopButton.addEventListener('click', stopCountdown);
  
    function stopCountdown() {
      // Clear the countdown interval
      clearInterval(countdownInterval);
    }
  });