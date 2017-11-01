console.log("check one two three");

var wordList = ["malcolm", "zoe", "wash", "inara", "river", "simon", "kaylee", "shepherd"];

var guesses = 0;
var prevGuess = [];
var wins = 0;
var losses = 0;
var computerWord = "";
var wordArray = [];
var displayArray = [];

function arraysEqual(arr1, arr2) { //needed to be able to compare two seperate arrays, this function allows for that.
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function restart() { //This function initializes a blank sheet/new game for a user and changes the display to show that.
    //   if (guesses === 0) { //Restart/Reset if condition - chooses a new word, resets guesses to 10, resets prevGuess array sets display array;
    prevGuess = [];
    guesses = 10;
    computerWord = wordList[Math.floor(Math.random() * wordList.length)]; //choose random word from the wordList
    wordArray = computerWord.split(""); // creates an array with letters of random word
    displayArray = []; // resets displayArray
    for (var i = 0; i < wordArray.length; i++) {
        displayArray.push(" __ "); // creates an array of wordArray legnth long and sets each element to " __ "
    }
    display();
    //  }
}

function display() { // when called upon, display will update the items needing to be displayed (previous guess, remaining guesses,hangman word, wins, and losses)
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#losses").innerHTML = losses;
    document.querySelector("#previousGuessList").innerHTML = prevGuess;
    document.querySelector("#gameoutput").innerHTML = displayArray;
    document.querySelector("#remainGuess").innerHTML = guesses;
}
restart(); //chooses first word when page is loaded
display(); //shows users display for first word
document.onkeyup = function(event) {
    var userGuess = event.key.toLowerCase(); //makes sure user input is in lower case
    if (prevGuess.indexOf(userGuess) === -1) {
        prevGuess.push(userGuess); //puts user keystroke in the array prevGuess if its not already there
        if (wordArray.indexOf(userGuess) === -1) {
            guesses--; // lowers number of guesses by 1 if guess hasn't been made previously and it doesn't match a letter in computer's word.
            if (guesses === 0) {
                losses++; //If your last guess pushes you to 0, this increases your losses before setting up a new game
                alert("Sorry you've lost! The correct word was: " + computerWord);
                restart();
                return;
            }
        }
        else {
            //displayArray[wordArray.indexOf(userGuess)] = userGuess; // changes the wordArray and inserts correct guess, doesn't cost player a guess.
            for (var j = wordArray.indexOf(userGuess); j < wordArray.length; j++) { //loops from first registered letter found and replaces correct letters in displayArray
                if (userGuess === wordArray[j]) {
                    displayArray[j] = userGuess;
                } // was setting up a loop from the first instance of a correct letter, trying matt's link instead
            }

        }
        //check for win, if so display an alert then reset game
        if (arraysEqual(displayArray, wordArray)) {
            //Set up a winning picture or sound here if you wish
            alert("Good job, you've won!!! the Correct word was " + computerWord); //alerts user they have won
            wins++; //increments wins by 1
            //guesses = 0; //set guesses to 0 to initiate a reset on the next keyup event; (no longer needed as restart is function)
            restart();
            return;
        }
    }
    else if (prevGuess.indexOf(userGuess) > -1) { //alerts user that they have guessed that letter already
        alert("You've already guessed that, try something else.")
    }
    display();
}
