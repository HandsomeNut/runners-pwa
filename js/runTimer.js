
// declare important variables
var running = false;
var startDate = 0
var i = 0;
var runTime;

// elements for ui manipulation
timerDisplay = document.getElementById("timer");
distanceDisplay = document.getElementById("distance");
speedDisplay = document.getElementById("speed");
caloriesDisplay = document.getElementById("calories");
speedAvgDisplay = document.getElementById("speedAvg");
startBtn = document.getElementById("startBtn");

//  timer counting up
function timer() {

  var now = new Date().getTime();

  var distance = now - startDate;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if(hours < 10){
    hours = "0" + hours;
  }

  if(minutes < 10){
    minutes = "0" + minutes;
  }

  if(seconds < 10){
    seconds = "0" + seconds;
  }

  timerDisplay.innerHTML = hours + ":" + minutes + ":" + seconds;

  // update additional timer infos
  if(distance%5 === 0){
    // getDistance()
    // getSpeed()
    // getCalories()
  };

  console.log(hours + ":" + minutes + ":" + seconds);
}

// Starts the timer
function startRun() {
  runTime = setInterval(timer, 1000);
};

// stops the timer
const stopRun = () => {
  clearInterval(runTime);
}


startBtn.addEventListener("click", evt =>{
  if(running){
    startBtn.innerHTML = "play_arrow";
    running = false;
    stopRun();
  } else {
    startBtn.innerHTML = "pause";
    running = true;
    startDate = new Date().getTime();
    startLoc = navigator
    startRun();
  }
});
