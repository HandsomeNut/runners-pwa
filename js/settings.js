
const runLengthDisplay = document.getElementById("runLengthDisplay");
const runLength = document.getElementById("runLength");
const pauseLengthDisplay = document.getElementById("pauseLengthDisplay");
const pauseLength = document.getElementById("pauseLength");
const warmupLengthDisplay = document.getElementById("warmupLengthDisplay");
const warmupLength = document.getElementById("warmupLength");

const gpsSetting = document.getElementById("gpsSetting");
const voiceSetting = document.getElementById("voiceSetting");
const soundSetting = document.getElementById("soundSetting");
const visulizerSetting = document.getElementById("visualizerSetting");
const progressSetting = document.getElementById("progressSetting");
const runType = document.getElementById("runType");
const runCount = document.getElementById("runCount");

// setting slider numbers to actual position
const setSliderDisplay = () => {
  pauseLengthDisplay.innerHTML = pauseLength.value + " min"
  warmupLengthDisplay.innerHTML = warmupLength.value + " min";
}
setSliderDisplay();

// updating the slider Numbers
pauseLength.addEventListener("change", function(){
  console.log(pauseLength);
  pauseLengthDisplay.innerHTML = pauseLength.value + " min"
});
warmupLength.addEventListener("change", function(){
  console.log(warmupLength);
  warmupLengthDisplay.innerHTML = warmupLength.value + " min"
});

// clearLogs, save and reset buttons
const clearLogs = document.getElementById("clearLogs");
const saveSettings = document.getElementById("saveSettings");
const resetSettings = document.getElementById("resetSettings");

clearLogs.addEventListener("click", function(){
  if(confirm("Sollen wirklich alle Logs gelöscht werden?")){
    clearObjectstore("history");
  }
});

saveSettings.addEventListener("click", function(){
  if(isNaN(runLength.value)){
    alert("Fehler! Falsche Eingabe!")
    runLength.select();
  } else {
    addSettings(gpsSetting.checked, voiceSetting.checked, soundSetting.checked, visualizerSetting.checked, progressSetting.checked, runType.value, runCount.value, runLength.value, pauseLength.value, warmupLength.value);
  };
});

resetSettings.addEventListener("click", function(){
  if(confirm("Sollen die Einstellungen wirklich zurück gesetzt werden?")){
    clearObjectstore("settings");
    gpsSetting.checked = false;
    voiceSetting.checked = true;
    soundSetting.checked = true;
    visualizerSetting.checked = true;
    progressSetting.checked = true;
    runLength.value = 0;
    runCount.value = 1;
    pauseLength.value = 0;
    warmupLength.value = 0;
    runType1();
    window.location.reload();
  }
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
const loadGeneralSetting = (general) => {
  gpsSetting.checked = general.gps;
  voiceSetting.checked = general.voice;
  soundSetting.checked = general.sound;
  visualizerSetting.checked = general.visualizer;
  progressSetting.checked = general.progress;
  console.log(gpsSetting.checked);
};

// loading runSetting
const loadRunSetting = (runSettings) => {

  console.log(runSettings.runType);

  if(runSettings.runType === 1){
    console.log("Unbegrenzt geladen")
  } else if(runSettings.runType === 2) {
    console.log("Passiert was");
    runType2();
  } else {
    console.log("I nehm die Numma 3")
    runType3();
  };

  // getting slider and dropdown data
  runCount.value = runSettings.runCount;
  runLength.value = runSettings.runLength;
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
