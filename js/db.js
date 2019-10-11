

if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
} else {
  console.log("läuft!")
}

let db = null;

function openDB() {
  const request = indexedDB.open("runnersPwa");

  // on upgrade needed
  request.onupgradeneeded = evt => {

    db = evt.target.result;

    const history = db.createObjectStore("history", {keyPath: "dateID"});
    const settings = db.createObjectStore("settings", {keyPath: "title"});

    console.log(`Upgrade is called ${db.name} version ${db.version}`);

  };

  // on Success
  request.onsuccess = evt => {
    db = evt.target.result;
    console.log(`${db.name} version ${db.version} is successfully called`);
  };

  // on error
  request.onerror = err => {
    console.log(`Error detected! ${err}`);
  };

}


function addLog() {

  const log = {
    dateID: dateID,
    distance: distanceDisplay.textContent,
    time: timerDisplay.textContent,
    date: dateString,
    month: todayDate.getMonth()
  };

  const transaction = db.transaction(["history"], "readwrite");

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

function getLogs() {

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
      const distance = cursor.value.distance;
      const time = cursor.value.time;
      const date = cursor.value.date;
      const month = cursor.value.month;

      renderLog(id, distance, time, date, month);
      // do sth with the cursor
      cursor.continue();
    }
  };

};

window.onload = function() {
  openDB();
};
