
const runs = document.querySelector(".runs");
var monthchecked = 0;
const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weatherPic = ["sunny_s_cloudy.png", "sunny.png", "cloudy.png"]
const runTypes = ["Unbegrenzt", "Begrenzt", "Interval"]

renderLog = (id, type, distance, time, date, month) => {

  let weather = weatherPic[Math.floor(Math.random()*weatherPic.length)];
  let runType = runTypes[type - 1];
  const log =
  `<div class="card-panel run white row" data-id="${id}">
    <div class="run-detail">
        <div class="run-title time col s6">
          ${distance} km
        </div>
        <div class="time col s6">
            <img class="right" src="/img/${weather}" alt="" style="width: 20px;">
        </div>
      <div class="divider col s12"></div>

      <!-- detail info -->
      <div class="info grey-text">
          <div class="time col s4">
             ${time}
           </div>
           <div class="info col s3">
              <span class="center">${runType}</span>
           </div>
           <div class="date col s5">
             <span class="right">${date}</span>
           </div>
      </div>

    </div>
  </div>`

  if(month != monthchecked){
    monthchecked = month;
    month = monthNames[month];
    const title = `<h6 class="run-month">${month}</h6>`;
    runs.innerHTML += title;
  }

  runs.innerHTML += log;
};

// get and render logs
document.addEventListener("DOMContentLoaded", function() {
  console.log("catching logs")
  setTimeout(function() {getLogs()}, 175)
});
