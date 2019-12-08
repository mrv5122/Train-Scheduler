var firebaseConfig = {
    apiKey: "AIzaSyCJTQSTWaDoMAFi-In5J5CjMidO1tskzpI",
    authDomain: "happy-hour-d3a31.firebaseapp.com",
    databaseURL: "https://happy-hour-d3a31.firebaseio.com",
    projectId: "happy-hour-d3a31",
    storageBucket: "",
    messagingSenderId: "629203832179",
    appId: "1:629203832179:web:5cc02d69ade2014ff44906"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainInfo = databse.ref("/trains");
console.log(trainInfo);

$(document).ready(() => {
  $("#submit-button").on("click", event => {

    //prevent page refresh, inputs from being auto submitted
    event.preventDefault();
  
    //getting user inputs
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#firstTime-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

 

    var trainsData = [];

    
    // clear form inputs upon submission
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTime-input").val("");
    $("#frequency-input").val("");

    // calculate time difference
    var timeCalculator = moment(firstTime, "HH:mm").subtract(1, "days");
    console.log(timeCalculator);

    var minDiff = moment().diff(timeCalculator, "minutes");
    console.log(minDiff + "minutes since first train");

    var remainingTime = minDiff % frequency;


    // min until next train
    var timeToNext = frequency - remainingTime;
    console.log(timeToNext + "mins untill next train");
  
    // next train time
    var nextTrainTime = moment().add(timeToNext, "min");

    var train = {
      "Name": trainName, 
      "Destination": destination,
      "First Train": firstTime,
      "Frequency": frequency,
      "Next Train Time": moment(nextTrainTime).format("HH:mm"),
      "Train arriving in": timeToNext
    };
    console.log(train);
    trainsData.push(train);
    console.log(trainData);
  });
// end submit button function

})
