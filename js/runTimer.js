
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
var intervalTime;

// general setting variables
var gps = false;
var voice = true;
var sound = true;
var visualizer = true;
var progress = true;
var runType = 1;
var runLength;
var runCount;
var pauseLength;
var pauseCount;
var warmupLength;
var completeLength;

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
  if(difference%3 === 0 && gps){
    getPosition();
  }
  if(difference%5 === 0 && gps){
    distanceAdded = getDistance();
    distance += distanceAdded;
    speed = getSpeed(distance, difference);
    // getCalories()

    // renderErrorLog(distanceAdded, startPos, currentPos, difference/5);
  };

  updateInfo(time, Math.round(distance * 100) / 100, speed);

  // check for runtimes
  if(runType != 1 && db != null){
    checkRuntime(difference, now);
  };

};

// Runtime function to account for different modes
const checkRuntime = (difference, now) => {

  let interval = Math.round((now - intervalTime)/1000);
  let run = (pauseCount < runCount);
  let pause = (pauseCount === runCount);
  let warmup = (difference <= warmupLength * 60);
  let cooldown = (difference <= completeLength * 60 && runCount === 0);
  console.log(Math.floor(interval/60), interval, runLength, pauseLength, warmupLength , runCount, pauseCount)

  progress = Math.floor((difference / (completeLength*60))*100);

  console.log("progress:" + progress, completeLength)

  runProgress.childNodes[1].style.width = progress + "%";

  // Setting progressBar color and sound for warmup and cooldown
  if(warmup){
    console.log("warmup")
    go.sound.onended = function(){warm.play()}
    runProgress.childNodes[1].style.backgroundColor = "var(--title)";
    if(difference === warmupLength * 60){
      interval = 0;
      intervalTime = now;
      voiceAndSound(bing, runSound, 500);
    };
  } else if(cooldown) {
    pauseSound.sound.onended = function(){cool.play()}
    console.log("cooldown")
    runProgress.childNodes[1].style.backgroundColor = "var(--title)";
  } else if(run) {
    console.log("run")
    runProgress.childNodes[1].style.backgroundColor = "var(--primary)"
  } else {
    console.log("pause")
    runProgress.childNodes[1].style.backgroundColor = "var(--secondary)";
  };

  // sound when close to the end
  let lastPart = (interval === (runLength * 60) * 0.8);
  if(runCount === 1 && run && lastPart && !warmup && !cooldown){
    voiceAndSound(miep, almostDone, 1000);
  };

  let runDone = (interval === runLength * 60);
  let pauseDone = (interval === pauseLength * 60);
  let typeMatch = (runType === 3);

  //check if phase is done
  if(difference === completeLength * 60){progress
    stopRun()
    voiceAndSound(bing, end, 500);
  } else if(runDone && run && !warmup && !cooldown) {
    intervalTime = now;
    runCount--;
    voiceAndSound(bing, pauseSound, 500);
  } else if(pauseDone && typeMatch && pause && !warmup && !cooldown) {
    intervalTime = now;
    pauseCount--;
    voiceAndSound(bing, runSound, 500);
  };

}

// Starts the timer
startRun = () => {
  startBtn.innerHTML = "pause";
  running = true;
  // get Date of today and precise Starttime
  todayDate = new Date();
  startTime = todayDate.getTime();
  // settingIntervalTime
  intervalTime = startTime;
  if(gps){getPosition()};
  runTime = setInterval(timer, 1000);
  voiceAndSound(bing, go, 500);
  wakelock.play();
};

// stops the timer
const stopRun = () => {
  startBtn.innerHTML = "play_arrow";
  startPosSet = false;
  running = false;
  // stop timer and add run to logs
  clearInterval(runTime);
  makeDateString();
  addLog();
  wakelock.stop();
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

const getDistance = () => {

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

const setStartPos = (position) => {
  startPos = position;
  startPosSet = true;
};

const renderErrorLog = (distanceAdded, pos1, pos2, num) => {

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
  <br>makeDateString();
    addLog();
  <br>
  `

  tracker.innerHTML += html;
};

const setCurrentPos = (position) => {
  currentPos = position;
  startPosSet = false;
};

const getSpeed = (distance, difference) => {
  let currentSpeed;
  currentSpeed = (distance / difference)*3600

  return Math.round(currentSpeed*100)/100
}

// makes a date string out of the date object
const makeDateString = () => {

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
    stopRun();

  } else {
    startRun();
  }
});

// load settings

const loadGeneralSetting = (general) => {
  gps = general.gps;
  voice = general.voice;
  sound = general.sound;
  visualizer = general.visualizer;
  progress = general.progress;
};

const loadRunSetting = (runSetting) => {
  runType = runSetting.runType;
  runLength = runSetting.runLength;
  pauseLength = runSetting.pauseLength;
  warmupLength = runSetting.warmupLength;

  // setting RunCount and completeLength
  if(runType === 2){
    runCount = 1;
    pauseCount = 0;
    completeLength = runLength + (warmupLength * 2);
  } else if(runType === 3){
    runCount = runSetting.runCount;

    // setting Pausecount
    if(pauseLength === 0){
      pauseCount = 0;
    } else {
      pauseCount = runCount - 1;
    };

    completeLength = (runLength * runCount) + (pauseLength * pauseCount) + (warmupLength * 2);
    console.log("runtime",completeLength , runLength, runCount, pauseLength, pauseCount, warmupLength)
  };

  console.log("loading settings!!!")
  // show progressBar
  if(runType != 1){
    if(progress){
      runProgress.style.display = "block";
    }
    if(visualizer){
      runVisual.style.display = "block";
      drawVisual(completeLength * 60, runLength * 60, runCount, pauseLength * 60, pauseCount, warmupLength * 60);
    };
  };
};

// load Sound
function audio(src, voiceSample, soundSample) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    if((sound&&soundSample) || (voice&&voiceSample)){
      this.sound.play();
    }
  }
  this.stop = function(){
    this.sound.pause();
  }
}

const voiceAndSound = (sound, voice, wait) => {
  sound.play();
  setTimeout(function(){voice.play()},wait);
}

const bing = new audio("/sound/bing.mp3", false, true);
const miep = new audio("/sound/miep.mp3", false, true);
const go = new audio("/sound/go.mp3", true, false);
const runSound = new audio("/sound/run.mp3", true, false);
const pauseSound = new audio("/sound/pause.mp3", true, false);
const almostDone = new audio("/sound/almostDone.mp3", true, false);
const end = new audio("/sound/end.mp3", true, false);
const warm = new audio("/sound/warmup.mp3", true, false);
const cool = new audio("/sound/cooldown.mp3", true, false);

// wakelock workaround
function video(src) {
  this.video = document.createElement("video");
  this.video.src = src;
  this.video.setAttribute("preload", "auto");
  this.video.setAttribute("controls", "none");
  this.video.setAttribute("loop", "loop");
  this.video.style.display = "none";
  document.body.appendChild(this.video);
  this.play = function(){
      this.video.play();
  }
  this.stop = function(){
    this.video.pause();
  }
};
const wakelock = new video("/img/wakelock.webm");


// // get settings
// document.addEventListener("DOMContentLoaded", function() {
//   console.log("catching settings")
//   setTimeout(function() {getSettings()}, 375)
// });
