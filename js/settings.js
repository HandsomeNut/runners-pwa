
const runLengthDisplay = document.getElementById("runLengthDisplay");
const runLength = document.getElementById("runLength");
const pauseLengthDisplay = document.getElementById("pauseLengthDisplay");
const pauseLength = document.getElementById("pauseLength");
const warmupLengthDisplay = document.getElementById("warmupLengthDisplay");
const warmupLength = document.getElementById("warmupLength");

const gpsSetting = document.getElementById("gpsSetting");
const runType = document.getElementById("runType");
const runCount = document.getElementById("runCount");
const pauseCount = document.getElementById("pauseCount");

// setting slider numbers to actual position
const setSliderDisplay = () => {
  runLengthDisplay.innerHTML = runLength.value + " min";
  pauseLengthDisplay.innerHTML = pauseLength.value + " min"
  warmupLengthDisplay.innerHTML = warmupLength.value + " min";
}
setSliderDisplay();

// updating the slider Numbers
runLength.addEventListener("click", function(){
  console.log(runLength);
  runLengthDisplay.innerHTML = runLength.value + " min"
});
pauseLength.addEventListener("click", function(){
  console.log(pauseLength);
  pauseLengthDisplay.innerHTML = pauseLength.value + " min"
});
warmupLength.addEventListener("click", function(){
  console.log(warmupLength);
  warmupLengthDisplay.innerHTML = warmupLength.value + " min"
});

// save and reset buttons
const saveSettings = document.getElementById("saveSettings");
const resetSettings = document.getElementById("resetSettings");

saveSettings.addEventListener("click", function(){
  addSettings(gpsSetting.checked, runType.value, runCount.value, runLength.value, pauseCount.value, pauseLength.value, warmupLength.value);
});

resetSettings.addEventListener("click", function(){
  clearSettings();
});

// changing between runtypes
runType.addEventListener("change", function(){
  console.log(runType.value)
  if(runType.value === "1"){
    console.log(runType.value)
    runType1();
  }else if(runType.value === "2"){
    console.log(runType.value)
    runType2();
  } else  if(runType.value === "3"){
    console.log(runType.value)
    runType3();
  };
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
});

// loading gps setting
const loadGpsSetting = (gps) => {
  gpsSetting.checked = gps;
  console.log(gpsSetting.checked);
};

// loading runSetting
const loadRunSetting = (runSettings) => {

  console.log(runSettings.runType);

  if(runSettings.runType === "1"){
    console.log("Unbegrenzt geladen")
  } else if(runSettings.runType === "2") {
    console.log("Passiert was");
    runType2();
  } else {
    console.log("I nehm die Numma 3")
    runType3();
  };

  // getting slider and dropdown data
  runCount.value = runSettings.runCount;
  runLength.value = runSettings.runLength;
  pauseCount.value = runSettings.pauseCount;
  pauseLength.value = runSettings.pauseLength;
  warmupLength.value = runSettings.warmupLength;

  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
  setSliderDisplay();

};

// get settings
document.addEventListener("DOMContentLoaded", function() {
  console.log("catching settings")
  setTimeout(function() {getSettings()}, 175)
});
