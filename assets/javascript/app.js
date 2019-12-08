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

    var trainData = [trainName, destination, firstTime, frequency];
    console.log(trainData);

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
  
    //change firebase save data
    database.ref().on("value", function(snapshot) {
  
      //print initial data value to console
      console.log(snapshot.val());
  
      //log value of various properties
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTime);
      console.log(snapshot.val().frequency);
      
      //Change the HTML
      $("#train").text(snapshot.val().trainName)
    })
  })
})
