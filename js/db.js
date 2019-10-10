if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
} else {
  console.log("läuft!")
}

let db = null;
function addDB() {
  const request = indexedDB.open("history");

  // on upgrade needed
  request.onupgradeneeded = evt => {
    db = evt.target.result;

    // notes = {
    //   title: "note1",
    //   text: "this is a note"
    // }
    const pLog = db.createObjectStore("personal_log", {keyPath: "title"});
    const nextLog = db.createObjectStore("next_log", {keyPath: "title"});

    console.log(`upgrade is called ${db.name} version ${db.version}`);
  };

  // on Success
  request.onsuccess = evt => {
    db = evt.target.result;
    console.log(`success is called ${db.name} version ${db.version}`);
  };

  // on error
  request.onerror = err => {
    console.log("Error detected!");
  };
}


function addNote() {

  const log = {
    title: "note1" + Math.random(),
    text: "this is a note"
  };

  const transaction = db.transaction(["personal_log"], "readwrite");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const newLog = transaction.objectStore("personal_log");

  console.log(newLog);

  // date = new Date();
  // month = date.getMonth() + 1;
  // day = date.getDate();
  // year = date.getFullYear();
  // hour = date.getHours();
  // minute = date.getMinutes()
  //
  // if(minute < 10){
  //   minute = "0" + minute;
  // };
  //
  // if(hour < 10){
  //   hour = "0" + hour;
  // };
  //
  // if(day < 10){
  //   day = "0" + day;
  // };
  //
  // if(month < 10){
  //   month = "0" + month;
  // }
  //
  // date = parseInt(`1${hour}${minute}${day}${month}${year}`);
  // console.log(date);

  newLog.add(log);

};

function viewLogs() {

  const transaction = db.transaction("personal_log", "readonly");

  transaction.oncomplete = function(evt) {
    console.log("Transaction success", evt);
  };

  transaction.onerror = function(err) {
    console.log("An Error occurred", err);
  };

  const pLog = transaction.objectStore("personal_log");

  const request = pLog.openCursor();

  request.onsuccess = evt => {
    const cursor = evt.target.result;

    if (cursor) {
      console.log(`${cursor.key} | ${cursor.value.title}, ${cursor.value.text} `)
      // do sth with the cursor
      cursor.continue();
    }
  };

};
