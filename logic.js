var config = {
    apiKey: "AIzaSyAjyKsNFQ0zL_Ieu1SCHebw2YbfZ7Xnx2M",
    authDomain: "train-e0c87.firebaseapp.com",
    databaseURL: "https://train-e0c87.firebaseio.com",
    projectId: "train-e0c87",
    storageBucket: "train-e0c87.appspot.com",
    messagingSenderId: "522780116358"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName =     $("#train-name-input").val().trim();
    var destination =   $("#destination-input").val().trim();
    var firstTrain =    $("#first-train-input").val().trim();
    var frequency =     $("#frequency-input").val().trim();
    //add validation
    var firstTrainConverted = moment(firstTrain, "HH:mm").format("X")
    var newTrain = {
        name:             trainName,
        trainDestination: destination,
        firstTrainTime:   firstTrainConverted,
        frequencyMinutes: frequency
    };

    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.trainDestination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequencyMinutes);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(sv){
    // console.log(sv.val());

var trainName  = sv.val().name;
var destination = sv.val().trainDestination;
var firstTrain = sv.val().firstTrainTime;
var frequency = sv.val().frequencyMinutes;

console.log(trainName);
console.log(destination);
console.log(firstTrain);
console.log(frequency);

var diffBetweenNowAndFirstTrain = moment().diff(moment.unix(firstTrain, "X"), "minutes");

console.log(diffBetweenNowAndFirstTrain)

var remainder = diffBetweenNowAndFirstTrain % frequency
console.log(remainder);

var minutesTillArrival = frequency - remainder
console.log(minutesTillArrival);

var nextArrival = moment().add(minutesTillArrival, 'm').format("HH:mm")
console.log(nextArrival);
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesTillArrival),
    
  );

  $("#train-table > tbody").append(newRow);
});