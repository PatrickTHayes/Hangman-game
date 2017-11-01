console.log("check one two three");

var wordList = ["malcolm", "zoe", "wash", "inara", "river", "simon", "kaylee", "shepherd"];

var guesses = 0;
var prevGuess = [];
var wins = 0;
var losses = 0;
var computerWord = "";
var wordArray = [];
var displayArray = [];

document.onkeyup = function(event) {

    if (guesses === 0) { //Restart/Reset if condition - chooses a new word, resets guesses to 10, resets prevGuess array sets display array;
        prevGuess = [];
        guesses = 10;
        computerWord = wordList[Math.floor(Math.random() * wordList.length)]; //choose random word from the wordList
        wordArray = computerWord.split(""); // creates an array with letters of random word
        displayArray = []; // resets displayArray 
        for (var i = 0; i < wordArray.length; i++) {
            displayArray.push(" __ "); // creates an array of wordArray legnth long and sets each element to " __ "
        }

    }

    var userGuess = event.key.toLowerCase(); //makes sure user input is in lower case
    if (prevGuess.indexOf(userGuess) === -1) {
        prevGuess.push(userGuess); //puts user key in the array prevGuess if its not already there
        if (wordArray.indexOf(userGuess) === -1) {
            guesses--; // lowers number of guesses by 1 if guess hasn't been made previously and it doesn't match a letter in computer's word.
        }
    }

}
