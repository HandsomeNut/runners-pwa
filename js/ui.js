
document.addEventListener("DOMContentLoaded", function() {
  const menus = document.querySelectorAll(".side-menu", "draggable: true")
  M.Sidenav.init(menus, {edge: "right"});
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
});


// elements for ui runTimer manipulation
const caloriesDisplay = document.getElementById("calories");
const paceDisplay = document.getElementById("pace");
const startBtn = document.getElementById("startBtn");
const tracker = document.querySelector(".tracker");
const runProgress = document.getElementById("runProgress");
const timerDisplay = document.getElementById("timer");
const distanceDisplay = document.getElementById("distance");
const speedDisplay = document.getElementById("speed");
var runVisual = document.getElementById("runVisual");



const updateTimer = (time, distance, speed,calories, pace) => {
  timerDisplay.innerHTML = time;
};

const updateInfo = (distance, speed, calories, pace) => {
    distanceDisplay.innerHTML = distance;
    speedDisplay.innerHTML = speed;
    caloriesDisplay.innerHTML = calories;
    paceDisplay.innerHTML = pace;
}

// a visualizer to show your runpartitioning

const drawVisual = (completeLength, runLength, runCount, pauseLength, pauseCount, warmupLength) => {
  runVisual.width = runVisual.clientWidth;
  runVisual.style.width = "";
  const width = runVisual.scrollWidth;
  const part = width / completeLength;
  const warmupPart = part * warmupLength;
  const runPart = part * runLength;
  const pausePart = part * pauseLength;

  console.log(width, part, warmupPart, runPart, pausePart, runCount, pauseCount);
  var pointer = 0;

  var warmup = true;

  const ctx = runVisual.getContext("2d");

  while(pointer < width){

    if(warmup){
    ctx.fillStyle = "#d32f2f";
    ctx.fillRect(pointer, 0, warmupPart, 30);

    pointer += warmupPart;
    console.log(pointer, warmupPart)
    warmup = false;
    }

    if(runCount === 0){
      ctx.fillStyle = "#d32f2f";
      ctx.fillRect(pointer, 0, warmupPart, 30);

      pointer += warmupPart;
      break
    }else if(runCount > pauseCount){
      ctx.fillStyle = "#fbc02d";
      ctx.fillRect(pointer, 0, runPart, 30);

      pointer += runPart;
      runCount--;
    } else {
      ctx.fillStyle = "#1976d2";
      ctx.fillRect(pointer, 0, pausePart, 30);

      pointer += pausePart;
      pauseCount--;
    }
  }
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
