
// declare important variables
var running = false;
var todayDate;
var dateString;
var startTime = 0;
var i = 0;
var runTime;
var distance = 0;
var distanceAdded = 0;
var speed = 0;
var startPos;
var startPosSet = false;
var currentPos;

//  timer counting up
timer = () => {

  var now = new Date().getTime();

  var difference = now - startTime;

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
  if(difference%3 === 0){
    getPosition();
  }
  if(difference%5 === 0){
    distanceAdded = getDistance();
    distance += distanceAdded;
    speed = getSpeed(distance, difference);
    // getCalories()

    // renderErrorLog(distanceAdded, startPos, currentPos, difference/5);
  };
  updateInfo(time, Math.round(distance * 100) / 100, speed);
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
  console.log('Geolocation is supported!');
} else {
  alert('Geolocation is not supported for this Browser/OS.');
};

// get current geolocation
getPosition = () => {
  var currentPos;
  var geoOptions = {
     timeout: 10 * 1000,
     enableHighAccuracy: true
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
};renderErrorLog = (distanceAdded, pos1, pos2, num) => {

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
renderErrorLog = (distanceAdded, pos1, pos2, num) => {

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

setCurrentPos = (position) => {
  currentPos = position;
  startPosSet = false;
};

getSpeed = (distance, difference) => {
  let currentSpeed;
  currentSpeed = (distance / difference)*3600

  return Math.round(currentSpeed*100)/100
}

// makes a date string out of the date object
makeDateString = () => {

  weekdays = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

  month = todayDate.getMonth() + 1;
  day = todayDate.getDate();
  year = todayDate.getFullYear();
  hour = todayDate.getHours();
  minute = todayDate.getMinutes();
  weekday = todayDate.getDay();

  if(minute < 10){
    minute = "0" + minute;
  };

  if(hour < 10){
    hour = "0" + hour;
  };

  if(day < 10){
    day = "0" + day;
  };

  if(month < 10){
    month = "0" + month;
  }

  dateString = weekdays[weekday] + ", " + day + "." + month + "." + year.toString().substr(-2);
  dateID = parseInt(`${year}${month}${day}${hour}${minute}`);
  console.log(dateID, dateString);

}

// on click of the play button
startBtn.addEventListener("click", evt =>{
  if(running){
    startBtn.innerHTML = "play_arrow";
    startPosSet = false;
    running = false;
    // stopping run and adding log to DB
    stopRun();
    makeDateString();
    addLog();
  } else {
    startBtn.innerHTML = "pause";
    running = true;
    // get Date of today and precise Starttime
    todayDate = new Date()
    startTime = todayDate.getTime();
    console.log("Hamlo I bims", startPos);
    getPosition();
    startRun();
  }
});
