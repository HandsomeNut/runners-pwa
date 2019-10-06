
document.addEventListener("DOMContentLoaded", function() {
  const menus = document.querySelectorAll(".side-menu")
  M.Sidenav.init(menus, {edge: "right"});
})

// elements for ui manipulation
timerDisplay = document.getElementById("timer");
distanceDisplay = document.getElementById("distance");
speedDisplay = document.getElementById("speed");
caloriesDisplay = document.getElementById("calories");
speedAvgDisplay = document.getElementById("speedAvg");
startBtn = document.getElementById("startBtn");

updateInfo = (time, distance) => {
  timerDisplay.innerHTML = time;
  distanceDisplay.innerHTML = distance;
}
