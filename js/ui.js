
document.addEventListener("DOMContentLoaded", function() {
  const menus = document.querySelectorAll(".side-menu", "draggable: true")
  M.Sidenav.init(menus, {edge: "right"});
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
});


// elements for ui runTimer manipulation
const caloriesDisplay = document.getElementById("calories");
const speedAvgDisplay = document.getElementById("speedAvg");
const startBtn = document.getElementById("startBtn");
const tracker = document.querySelector(".tracker");
var timerDisplay;
var distanceDisplay;
var speedDisplay;

updateInfo = (time, distance) => {
  timerDisplay = document.getElementById("timer");
  distanceDisplay = document.getElementById("distance");
  speedDisplay = document.getElementById("speed");

  timerDisplay.innerHTML = time;
  distanceDisplay.innerHTML = distance;
  speedDisplay.innerHTML = speed;
};

// renderErrorLog = (distanceAdded, pos1, pos2, num) => {
//
//   const timeStamp = new Date()
//
//   const html = `
//   <div class="log card-panel">
//     <h6>Log: ${num}</h6>
//     <p>${timeStamp}</p>
//     <p>${distanceAdded}km</p>
//     <p>${pos1.coords.latitude} | ${pos1.coords.longitude}</p>
//     <p>${pos2.coords.latitude} | ${pos2.coords.longitude}</p>
//   </div>
//   <br>
//   <br>
//   <br>
//   <br>
//   <br>
//   `
//
//   tracker.innerHTML += html;
// };


// settings page

const runType1 = () => {
  // activating sliders and dropdowns
  runType.value = 1;
  runCount.disabled = true;
  runLength.disabled = true;
  pauseCount.disabled = true;
  pauseLength.disabled = true;
  warmupLength.disabled = true;

  // setting colors
  runSettings = document.getElementById("runSettings");
  pauseSettings = document.getElementById("pauseSettings");
  warmupSettings = document.getElementById("warmupSettings");
  runSettings.style.color = "grey";
  pauseSettings.style.color = "grey";
  warmupSettings.style.color = "grey";
}

const runType2 = () => {
  // activating sliders and dropdowns
  runType.value = 2;
  runCount.disabled = true;
  runLength.disabled = false;
  pauseCount.disabled = true;
  pauseLength.disabled = true;
  warmupLength.disabled = false;

  // setting colors
  runSettings = document.getElementById("runSettings");
  pauseSettings = document.getElementById("pauseSettings");
  warmupSettings = document.getElementById("warmupSettings");
  runSettings.style.color = "#000";
  pauseSettings.style.color = "grey";
  warmupSettings.style.color = "#000";
}

const runType3 = () => {
  // activating sliders and dropdowns
  runType.value = 3;
  runCount.disabled = false;
  runLength.disabled = false;
  pauseCount.disabled = false;
  pauseLength.disabled = false;
  warmupLength.disabled = false;

  // setting colors
  runSettings = document.getElementById("runSettings");
  pauseSettings = document.getElementById("pauseSettings");
  warmupSettings = document.getElementById("warmupSettings");
  runSettings.style.color = "#000";
  pauseSettings.style.color = "#000";
  warmupSettings.style.color = "#000";
}
