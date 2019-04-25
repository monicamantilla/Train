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

    var newTrain = {
        name: trainName,
        trainDestination: destination,
        firstTrainTime: firstTrain,
        frequencyMinutes: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.trainDestination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequencyMinutes);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");


});