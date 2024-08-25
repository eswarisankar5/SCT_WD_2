let startTime = 0;
let elapsedTime = 0;
let intervalId;
let laps = [];

function start() {
    if (!intervalId) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
    }
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
}

function reset() {
    stop();  // Stop the stopwatch if it's running
    elapsedTime = 0;  // Set elapsed time to 0
    laps = [];  // Clear all laps
    document.getElementById('display').innerText = '00:00:00:00';  // Directly set the display to '00:00:00'
    document.getElementById('laps').innerHTML = '';  // Clear the lap times displayed on the page
}


function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    let time = formatTime(elapsedTime);
    document.getElementById('display').innerText = time;
}

function formatTime(ms) {
    let milliseconds = Math.floor(ms % 1000 / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

function recordLap() {
    if (intervalId) {
        let lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        displayLaps();
    }
}

function displayLaps() {
    let lapsDiv = document.getElementById('laps');
    lapsDiv.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapElement = document.createElement('div');
        lapElement.innerText = `Lap ${index + 1}: ${lap}`;
        lapsDiv.appendChild(lapElement);
    });
}
