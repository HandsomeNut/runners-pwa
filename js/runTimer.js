
// declare important variables
var running = false;
var startDate = 0
var i = 0;
var runTime;
var distance = 0
var startPos;
var startPosSet = false;
var currentPos;

//  timer counting up
timer = () => {

  var now = new Date().getTime();

  var difference = now - startDate;

  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if(hours < 10){
    hours = "0" + hours;
  };

  if(minutes < 10){
    minutes = "0" + minutes;
  };

  if(seconds < 10){
    seconds = "0" + seconds;
  };

  time = hours + ":" + minutes + ":" + seconds;

  difference = Math.round(difference / 1000)
  // update additional timer infos
  if(difference%4 === 0){
    getPosition();
  }
  if(difference%5 === 0){
    distance += (Math.round(getDistance() * 100) / 100);
    // getSpeed()
    // getCalories()
  };
  updateInfo(time, distance);
  console.log(hours + ":" + minutes + ":" + seconds);
};

// Starts the timer
startRun = () => {
  runTime = setInterval(timer, 1000);
};

// stops the timer
const stopRun = () => {
  clearInterval(runTime);
};

// test for geolocation
if (navigator.geolocation) {
  alert('Geolocation is supported!');
} else {
  alert('Geolocation is not supported for this Browser/OS.');
};

// get current geolocation
getPosition = () => {
  var currentPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    if(startPosSet){
      setCurrentPos(position);
      console.log("curPos gesetzt")
    } else {setStartPos(position); console.log("Start Pos gesetzt", startPos);}
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

};

getDistance = () => {

  var lat2 = currentPos.coords.latitude;
  var lon2 = currentPos.coords.longitude;
  var lat1 = startPos.coords.latitude;
  var lon1 = startPos.coords.longitude;

  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var distance = R * c; // Distance in km
  console.log(!setStartPos);
  if(!setStartPos){
    startPos = currentPos;
    startPosSet = true;
  }


  return distance;
};

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

setStartPos = (position) => {
  startPos = position;
  startPosSet = true;
};

setCurrentPos = (position) => {
  currentPos = position;
  startPosSet = false;
};

// on click of the play button
startBtn.addEventListener("click", evt =>{
  if(running){
    startBtn.innerHTML = "play_arrow";
    setStartPos = false;
    running = false;
    stopRun();
  } else {
    startBtn.innerHTML = "pause";
    running = true;
    startDate = new Date().getTime();
    console.log("Hamlo I bims", startPos);
    getPosition();
    startRun();
  }
});
