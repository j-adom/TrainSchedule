var firebaseConfig = {
    apiKey: "AIzaSyCvqqTTMdfbqbG4cZQlWgU00SSbQsS8CYs",
    authDomain: "j-s-hotness.firebaseapp.com",
    databaseURL: "https://j-s-hotness.firebaseio.com",
    projectId: "j-s-hotness",
    storageBucket: "",
    messagingSenderId: "531259154043",
    appId: "1:531259154043:web:d13212a5e9ab0037"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var name = "";
  var destination = "";
  var start = "";
  var freq;

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    start = $("#train-start").val().trim();
    freq = $("#train-frequency").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      start: start,
      freq: freq,
    //   dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.start);
    console.log(sv.freq);

    // Add train to table
    let currentTime = moment()    
    let convertedStart = moment(sv.start,"hh:mm")
    let runTime = currentTime.diff(convertedStart,"minutes")
    let timeRemaining = runTime % sv.freq
    console.log(convertedStart)
    console.log("Run time: " + runTime)
    console.log("Time Remaining: " + timeRemaining)
    console.log(sv.start)
    console.log(moment())
    var nextTrain

    console.log(moment().diff(moment(convertedStart),"minutes"))

    if(moment().diff(moment(convertedStart),"minutes") > 0){
    
        nextTrain = sv.freq - timeRemaining

    } else{
        nextTrain = moment().diff(moment(convertedStart),"minutes")

        console.log(nextTrain)
    }



    console.log(nextTrain)

    
    var newRow = $("<tr>")
        .append($("<td>").text(sv.name))
        .append($("<td>").text(sv.destination))
        .append($("<td>").text(sv.freq))   
        .append($("<td>").text(moment().add(nextTrain,'minutes')
                                        .format("HH:mm")))
        .append($("<td>").text(nextTrain))
    
    $("table tbody").append(newRow);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

// Clock function
function update() {
  $('#clock').html(moment().format('Do MMM YY H:mm:ss'));
}

setInterval(update, 1000);