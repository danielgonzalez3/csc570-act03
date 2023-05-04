window.onload = async function() {

    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data == null) {
                return;
            }
            const timestamp = new Date().toISOString();
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            var x = data.x; //these x coordinates are relative to the viewport
            var y= data.y; //these y coordinates are relative to the viewport
            addToCSV(timestamp, x, y);
            //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};

// CSV header
const csvHeader = "timestamp,x,y\n";
let csvData = csvHeader;
// Add data to CSV string
function addToCSV(timestamp, x, y) {
  csvData += timestamp + "," + x + "," + y + "\n";
}

// Save CSV string to a file
function saveCSV() {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "webgazer_data.csv";
  a.click();
}

// Set up saving of data
// let saveInterval = setInterval(() => {
//     const timestamp = new Date().toISOString();
//     const prediction = webgazer.getCurrentPrediction();
//     if (prediction) {
//       const x = prediction.x;
//       const y = prediction.y;
//       console.log(x, y);
//       addToCSV(timestamp, x, y);
//     }
//   }, 1000);

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
    // clearInterval(saveInterval);
    saveCSV();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
