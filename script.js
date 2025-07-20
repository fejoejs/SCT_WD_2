let startTime = 0;
let elapsedTime = 0;
let interval;
let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById("display");
const lapRecords = document.getElementById("lapRecords");

function updateDisplay(time) {
  const ms = parseInt((time % 1000), 10);
  const sec = parseInt((time / 1000) % 60, 10);
  const min = parseInt((time / (1000 * 60)) % 60, 10);
  const hr = parseInt((time / (1000 * 60 * 60)) % 24, 10);

  const formatted = 
    `${hr.toString().padStart(2, '0')}:` +
    `${min.toString().padStart(2, '0')}:` +
    `${sec.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(3, '0')}`;

  display.textContent = formatted;
}

function startStopwatch() {
  if (!interval) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(interval);
  interval = null;
}

function resumeStopwatch() {
  if (!interval) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  lastLapTime = 0;
  lapCount = 0;
  updateDisplay(elapsedTime);
  lapRecords.innerHTML = '';
}

function recordLap() {
  const lapTime = elapsedTime - lastLapTime;
  lastLapTime = elapsedTime;
  lapCount++;

  const row = document.createElement('tr');

  const lapCell = document.createElement('td');
  lapCell.textContent = lapCount;

  const lapTimeCell = document.createElement('td');
  lapTimeCell.textContent = formatTime(lapTime);

  const totalTimeCell = document.createElement('td');
  totalTimeCell.textContent = formatTime(elapsedTime);

  row.appendChild(lapCell);
  row.appendChild(lapTimeCell);
  row.appendChild(totalTimeCell);

  lapRecords.appendChild(row);
}

function formatTime(time) {
  const ms = parseInt((time % 1000), 10);
  const sec = parseInt((time / 1000) % 60, 10);
  const min = parseInt((time / (1000 * 60)) % 60, 10);
  const hr = parseInt((time / (1000 * 60 * 60)) % 24, 10);

  return `${hr.toString().padStart(2, '0')}:` +
         `${min.toString().padStart(2, '0')}:` +
         `${sec.toString().padStart(2, '0')}.` +
         `${ms.toString().padStart(3, '0')}`;
}
