////////////////////////
////    game.js      
////////////////////////

////////////////////////
////    configuration      
////////////////////////

var debug = false;

////////////////////////
////    global variables      
////////////////////////

var arrButtonID = ["#emerald", "#ruby", "#topaz", "#alexandrite"];
var finalScore = 0;
var computerGuess = null;
var winner = null;
var winCounter = 0;
var lossCounter = 0;
var gameComplete = false;

////////////////////////
////    functions      
////////////////////////

////////////////////////
// set all fields to their default values
////////////////////////
function initializeGame() {

    finalScore = 0;
    computerGuess = null;
    winner = null;
    gameComplete = false;
    $("#score, #computer-pick").empty();

}

////////////////////////
////    Generate displayed random number      
////////////////////////
function generateComputerGuess() {

    computerGuess = Math.floor((Math.random() * 120) + 19);
    // Target div to write data
    var targetDiv = $("#computer-pick");
    if (debug) {
        console.log("computerGuess generated as: " + computerGuess);
    }
    targetDiv.text(computerGuess);
}
////////////////////////
////    calculate values of clicked crystals      
////////////////////////
function generateCrystalValues() {
    for (i = 0; i < arrButtonID.length; i++) {
        // at the start of the game, each crystal is given a random point value from 1 - 12
        var randomNumber = Math.floor((Math.random() * 12) + 1);
        // Target div to write data
        var targetDiv = $(arrButtonID[i]);
        if (debug) {
            console.log("Crystal id: " + arrButtonID[i] + " generated as: " + randomNumber);
        }
        $(arrButtonID[i]).attr("value", randomNumber);
        console.log("ID: " + arrButtonID[i] + " was set to: " + randomNumber);
    }
}

////////////////////////
////    game play      
////////////////////////

$(document).ready(function () {

    // pseudo
    ////////////////////////
    // Initialize the game for the first run where the gameComplete variable has not yet been set
    ////////////////////////
    if (!gameComplete) {
        // randomly generate a displayed number as the computer's pick
        initializeGame();
        // Generate the computerGuess
        generateComputerGuess();
        // On load of page hide the result well
        $("#result").hide();
        // Generate crystals values
        generateCrystalValues();
    }

    ////////////////////////
    // user clicks each crystal to determine its unknown value
    ////////////////////////
    $(".btn").click(function (event) {
        // Determine the value of the button that was clicked
        var btnValue = this.value;
        var btnID = this.id;
        if (debug) {
            console.log("btnValue is: " + btnValue);
            console.log("btnID is: " + btnID);
        }
        // the value is displayed and each click of any crystal will add to the finalScore
        finalScore = (parseInt(finalScore) + parseInt(btnValue));
        console.log("finalScore: " + finalScore);
        // update the id "#score"
        $("#score").text(finalScore);
        ////////////////////////
        // Determine if the player has won
        ////////////////////////
        if (finalScore === computerGuess && !gameComplete) {
            winner = true;
            // update the wins counter
            winCounter++
            $("#wins").text(winCounter);
            if (debug) {
                console.log("finalScore === computerGuess")
            }
            // output a message to the user to show them that they won
            $("#result").text("You Win!");
            $("#result").show();
            // Set the gameComplete to true as we have now played a round and will need to re-initialize the game to start over
            gameComplete = true;
        }
        ////////////////////////
        // Determine if the player has lost
        ////////////////////////
        else if (finalScore > computerGuess && !gameComplete) {
            winner = false;
            // update loss counter
            lossCounter++
            $("#losses").text(lossCounter);
            if (debug) {
                console.log("finalScore > computerGuess")
            }
            // output a message to the user that they have lost
            $("#result").text("You Lost!");
            $("#result").show();
            // Set the gameComplete to true as we have now played a round and will need to re-initialize the game to start over
            gameComplete = true;
        }
        ////////////////////////
        ////    re-initialize the game to start fresh      
        ////////////////////////
        if (gameComplete) {
            initializeGame();
            generateComputerGuess();
            generateCrystalValues();
        }
    });
});