// Global variables
var wins = 0;
var losses = 0;
var numGuesses = 7;
var secretArray = ["LAURA PALMER", "CHERRY PIE", "THE RED ROOM", "ONE EYED JACKS", "THE LOG LADY", "AGENT COOPER", "DAVID LYNCH", "FIRE WALK WITH ME", "THE BLACK LODGE", "DAMN GOOD COFFEE", "AUDREY HORNE", "DOPPELGANGER", "GREAT NORTHERN"];
var secretPhrase;
var phraseArray = [];
var blankArray = [];
var lettersGuessed = [];
var letterIndex;
var currentGuess;
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var spanWins = document.getElementById("spanWins");
var spanLosses = document.getElementById("spanLosses");
var spanNumGuesses = document.getElementById("spanNumGuesses");
var spanLettersGuessed = document.getElementById("spanLettersGuessed");
var spanSecretRandom = document.getElementById("spanSecretRandom");
var changeImage = document.getElementById("gameimg");
var changeGameStatus = document.getElementById("gameStatus");

// Generates a random index number for selecting a secret phrase in secretArray
function randomSelection() {
	secretPhrase = secretArray[Math.floor(Math.random() * secretArray.length)];
}

// Creates an array of letters in the secret phrase and a corresponding array of blank spaces 
function createArrays() {
	phraseArray = [];
	blankArray = [];
	var numBlanks = 0;

	phraseArray = secretPhrase.split("");
	numBlanks = phraseArray.length;

	for (var i = 0; i < numBlanks; i++) {
		blankArray.push("_");
	}

	spanSecretRandom.innerHTML = blankArray.join(" ");
	console.log(phraseArray);
}

function newGame() {
	randomSelection();
	createArrays();

 	// Populates spaces so that user only needs to guess letters
 	for (var i = 0; i < phraseArray.length; i++) {
 		if (phraseArray[i] === " ") {
 			blankArray[i] = "&nbsp;";
 			spanSecretRandom.innerHTML = blankArray.join(" ");
 		}
 	}

 	numGuesses = 7;
 	lettersGuessed = [];
	spanLettersGuessed.innerHTML = lettersGuessed;
 	spanWins.innerHTML = wins;
	spanLosses.innerHTML = losses;
	spanNumGuesses.innerHTML = numGuesses;
	changeGameStatus.innerHTML = "Press any key to play";
	changeImage.src = "assets/images/tpwelcome.jpg";
 }

// Function called when user runs out of guesses and hasn't guessed correct word
 function gameOver() {
 	losses++;
	spanLosses.innerHTML = losses;
	changeImage.src = "assets/images/gameover.jpg";
	changeGameStatus.innerHTML = "The secret phrase was " + secretPhrase;
 }

// Function called when user has guessed the correct word
 function youWin() {
 	wins++;
	spanWins.innerHTML = wins;
	changeImage.src = "assets/images/winner.jpg";
	changeGameStatus.innerHTML = "YOU'RE A WINNER";
 }

 // Function that checks the guessed letter against the secret phrase
 function checkLetter() {
 	if (validKeys.indexOf(currentGuess) > -1) {
		if ((secretPhrase.indexOf(currentGuess) > -1)) {
			for (var i = 0; i < secretPhrase.length; i++) {
				if (phraseArray[i] === currentGuess) {
					blankArray[i] = currentGuess;
					spanSecretRandom.innerHTML = blankArray.join(" ");
				}
			}
		} else {
			lettersGuessed.push(currentGuess);
			spanLettersGuessed.innerHTML = lettersGuessed.join(" ");
			numGuesses--;
			spanNumGuesses.innerHTML = numGuesses;
		}
	} else {
		alert("Please guess a valid letter");
	}
 }

 // Start game:

newGame();

document.onkeyup = function(event) {
	
	if (numGuesses < 1) { //no guesses left, so game over
		return;
	} else if (blankArray.indexOf("_") < 0) { // this means the phrase has been solved
		return;
	}

	var keyHit = event.key;
	currentGuess = keyHit.toUpperCase();

	// calls the checkLetter function
	checkLetter();
	
	// if there are no blanks left, call the youWin function; if there are no guesses left, call the gameOver function
	if (blankArray.indexOf("_") < 0) {
		youWin();
	} else if (numGuesses === 0) {
		gameOver();
	}
}



