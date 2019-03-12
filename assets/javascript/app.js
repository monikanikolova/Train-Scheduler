
 

    // Initialize Firebase


    // Create a variable to reference the database
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrain = "";
    // Capture Button Click
    $("#add-train").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();
      
   
      trainInfo = {
        trainName: $("#name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        frequency: $("#frequency-input").val().trim(),
        firstTrain:$("#first-input").val().trim(),
      };
      
      database.ref().push(trainInfo);
      console.log(trainName);
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#first-input").val("");

      });
   
      database.ref().on("child_added", function (childSnapshot) {
        
        var childName = childSnapshot.val().trainName;
        var childDestination = childSnapshot.val().destination;
        var childFrequency = childSnapshot.val().frequency;
        var childFirstTrain = childSnapshot.val().firstTrain;
        console.log("child" + childFirstTrain);
        
        
        var firstTrainConverted = moment(childFirstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTrainConverted);
      
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));
        

        // var convertedTime = moment().unix(childFirstTrain).format("hh:mm");
        var differenceTime = moment().diff(moment(firstTrainConverted), "minutes");
        var reminder = differenceTime % childFrequency;
        var minutesUnillNext = childFrequency - reminder;
        var nextTrain = moment().add(minutesUnillNext, "minutes");
        var nextTrainConverted = moment(nextTrain).format("hh:mm a");





        $("#schedule > tbody").append("<tr><td>" + childName + "</td>" + "<td>" + childDestination + "</td>" + "<td>" + "Every " + childFrequency + " mins" + "</td>" + "<td>" + nextTrainConverted + "</td>" + "<td>" + minutesUnillNext + " minutes until arrival" + "</tr></td>")
      });