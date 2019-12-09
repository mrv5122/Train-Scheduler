var firebaseConfig = {
  apiKey: "AIzaSyCJTQSTWaDoMAFi-In5J5CjMidO1tskzpI",
  authDomain: "happy-hour-d3a31.firebaseapp.com",
  databaseURL: "https://happy-hour-d3a31.firebaseio.com",
  projectId: "happy-hour-d3a31",
  storageBucket: "happy-hour-d3a31.appspot.com",
  messagingSenderId: "629203832179",
  appId: "1:629203832179:web:32d38dc4a1619073f44906",
  measurementId: "G-WN7NNJ6SRE"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var trainInfo = database.ref("/trains");
console.log(trainInfo);

$(document).ready(function() {
  $("#submit-button").on("click", event => {
    //prevent page refresh, inputs from being auto submitted
    event.preventDefault();

    //getting user inputs
    var trainNameIn = $("#trainName-input")
      .val()
      .trim();
    var destinationIn = $("#destination-input")
      .val()
      .trim();
    var firstTimeIn = $("#firstTime-input")
      .val()
      .trim();
    var frequencyIn = $("#frequency-input")
      .val()
      .trim();

    // clear form inputs upon submission
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTime-input").val("");
    $("#frequency-input").val("");


    // time stuff
    var timeConverter = moment(firstTimeIn, "HH:mm").subtract(1, "days");

    console.log(timeConverter);

    var minuteDiff = moment().diff(timeConverter, "minutes");
    console.log("Minutes difference to first train: " + minuteDiff);

    var timeRemaining = minuteDiff % frequencyIn;

    // Minutes until train
    var timeToNext = frequencyIn - timeRemaining;
    console.log("How many minutes left before next train: " + timeToNext);

    //Time of next train
    var nextTrainTimeInput = moment().add(timeToNext, "minutes");


    var trainObject = {
      trainName: trainNameIn,
      destination: destinationIn,
      firstTime: firstTimeIn,
      frequency: frequencyIn,
      nextTrainTime: moment(nextTrainTimeInput).format("hh:mm"),
      trainArrivesInMin: timeToNext
    };
    console.log(trainObject);

database.ref().push(trainObject);

    console.log(trainInfo);
  }); // end submit button functionality

  // update next train arrival & next train time data
    $("#train-info").html("");
database.ref().on("child_added", snapshot => {

      var newTrainRow;

    var trainName = snapshot.val().trainName;
    var trainDest = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTime;
    var trainFreq = snapshot.val().frequency;
    var nextTrainTime = snapshot.val().nextTrainTime;
    var trainArrivesIn = snapshot.val().trainArrivesInMin;

  
      newTrainRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(firstTrain),
        $("<td>").text(trainFreq + " mins"),
        $("<td>").text(nextTrainTime),
        $("<td>").text(trainArrivesIn + " minutes")
      );

      $("#train-info").append(newTrainRow);

      //update timestamps

    
    });

    // show current time on screen
    currTimeUpd = () => {
      var thisTime = moment().format("HH:mm:ss");
      $(".timeNow").text(thisTime);
    }
    currTimeUpd();
  
    setInterval(currTimeUpd, 1000);
});
