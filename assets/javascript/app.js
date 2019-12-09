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

    var trainObject = {
      trainName: trainNameIn,
      destination: destinationIn,
      firstTime: firstTimeIn,
      frequency: frequencyIn,
    };
    console.log(trainObject);

    trainInfo.push(trainObject);

    console.log(trainInfo);
  }); // end submit button functionality

  // update next train arrival & next train time data
  dataUpdater = () => {
    $("#train-info").html("");
    trainInfo.on("child_added", snapshot => {
      var newTrainRow;

      var trainName = snapshot.val().trainName;
      var trainDest = snapshot.val().destination;
      var firstTrain = snapshot.val().firstTime;
      var trainFreq = snapshot.val().frequency;

      var firstTime = moment(firstTrain, "HH:MM").subtract(1, "years");
      console.log(firstTime);
  
      var timeDifference = moment().diff(moment(firstTime), "minutes");

      var timeRemaining =  timeDifference % trainFreq;
      console.log(timeRemaining);
  
      var timeUntillNext = trainFreq - timeRemaining;
      console.log(timeUntillNext);
  
      var nextTrainTime = moment().add(timeUntillNext, "minutes");
      console.log(nextTrainTime);
  

      console.log(trainName, trainDest, firstTrain, trainFreq, nextTrainTime, timeUntillNext);

      newTrainRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(firstTrain),
        $("<td>").text(trainFreq),
        $("<td>").text(moment(nextTrainTime).format("HH:mm")),
      );

      $("#train-info").append(newTrainRow);

      //update timestamps

    
    });
  } // end data updater

    // show current time on screen
    currTimeUpd = () => {
      var thisTime = moment().format("HH:mm:ss");
      $(".timeNow").text(thisTime);
    }
    currTimeUpd();
    setInterval(currTimeUpd, 1000);
    setInterval(dataUpdater, 1000);

});
