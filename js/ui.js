
document.addEventListener("DOMContentLoaded", function() {
  const menus = document.querySelectorAll(".side-menu")
  M.Sidenav.init(menus, {edge: "right"});
});

// elements for ui manipulation
caloriesDisplay = document.getElementById("calories");
speedAvgDisplay = document.getElementById("speedAvg");
startBtn = document.getElementById("startBtn");
const tracker = document.querySelector(".tracker");

updateInfo = (time, distance) => {
  timerDisplay = document.getElementById("timer");
  distanceDisplay = document.getElementById("distance");
  speedDisplay = document.getElementById("speed");

  timerDisplay.innerHTML = time;
  distanceDisplay.innerHTML = distance;
  speedDisplay.innerHTML = speed;
};

renderLog = (distanceAdded, pos1, pos2, num) => {

  const timeStamp = new Date()

  const html = `
  <div class="log card-panel">
    <h6>Log: ${num}</h6>
    <p>${timeStamp}</p>
    <p>${distanceAdded}km</p>
    <p>${pos1.coords.latitude} | ${pos1.coords.longitude}</p>
    <p>${pos2.coords.latitude} | ${pos2.coords.longitude}</p>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  `

  tracker.innerHTML += html;
};
