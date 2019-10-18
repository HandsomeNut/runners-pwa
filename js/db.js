

if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
} else {
  console.log("läuft!")
}

var db = null;

function openDB() {
  const request = indexedDB.open("runnersPwa");

  // on upgrade needed
  request.onupgradeneeded = evt => {

    db = evt.target.result;

    const history = db.createObjectStore("history", {keyPath: "dateID"});
    const settings = db.createObjectStore("settings", {keyPath: "title"});
    const overview = db.createObjectStore("overview", {keyPath: "title"});

    console.log(`Upgrade is called ${db.name} version ${db.version}`);
  };

  // on Success
  request.onsuccess = evt => {
    db = evt.target.result;
    console.log(`${db.name} version ${db.version} is successfully called`);
    console.log("catching settings")
    getSettings()
  };

  // on error
  request.onerror = err => {
    console.log(`Error detected! ${err}`);
  };

};


// add new database objectstores
function addLog() {

  const log = {
    dateID: dateID,
    runType: runType,
    distance: distanceDisplay.textContent,
    time: timerDisplay.textContent,
    date: dateString,
    month: todayDate.getMonth()
  };

  const transaction = db.transaction("history", "readwrite");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const newLog = transaction.objectStore("history");

  console.log(newLog);

  newLog.add(log);

};

const addSettings = (gps, voice, sound, visualizer, progress, runType, runCount, runLength, pauseLength, warmupLength) => {
  const generalSetting = {
    title: "general",
    gps: gps,
    voice: voice,
    sound: sound,
    visualizer: visualizer,
    progress: progress,
  };

  const runSetting = {
    title: "run",
    runType: parseInt(runType),
    runCount: parseInt(runCount),
    runLength: parseInt(runLength),
    pauseLength: parseInt(pauseLength),
    warmupLength: parseInt(warmupLength),
  };

  const transaction = db.transaction("settings", "readwrite");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const updateSettings = transaction.objectStore("settings");

  updateSettings.put(generalSetting);
  updateSettings.put(runSetting);

}

//  get objectstores
const getLogs = () => {

  const transaction = db.transaction("history", "readonly");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const historyDB = transaction.objectStore("history");

  const request = historyDB.openCursor();

  request.onsuccess = evt => {
    const cursor = evt.target.result;

    if (cursor) {
      console.log(`${cursor.key} | ${cursor.value.title}, ${cursor.value.text} `)
      const id = cursor.value.dateID;
      const type = cursor.value.runType;
      const distance = cursor.value.distance;
      const time = cursor.value.time;
      const date = cursor.value.date;
      const month = cursor.value.month;

      renderLog(id, type, distance, time, date, month);
      // do sth with the cursor
      cursor.continue();
    }
  };

};

const getSettings = () => {
  const transaction = db.transaction("settings", "readonly");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const settingsDB = transaction.objectStore("settings");

  const request = settingsDB.openCursor();

  request.onsuccess = evt => {
    const cursor = evt.target.result;

    if (cursor) {
      console.log(`${cursor.key} | ${cursor.value.title}`)

      if(cursor.key === "general") {
        loadGeneralSetting(cursor.value);
      } else {
        loadRunSetting(cursor.value);
      }
      // do sth with the cursor
      cursor.continue()
    }
  };
};

// clear settingsDB
const clearObjectstore = (objectStore) => {
  const transaction = db.transaction(objectStore, "readwrite");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const settingsDB = transaction.objectStore(objectStore);

  const request = settingsDB.clear();

  request.onsuccess = function(evt) {
    console.log("Was successfully cleared!")
    // reinitialize DB with Default
    if(objectStore === "settings"){
      addSettings(false, true, true, true, true, 1, 1, 0, 0, 0);
    }
  };
};

window.onload = function() {
  openDB();
};
