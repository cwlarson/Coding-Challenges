// Initialize global variables
var gameInPlay = false,
	lettersOnScreen = {},
	charset = "abcdefghijklmnopqrstuvwxyz",
	addLetterInterval,
	lettersLeftInRound,
	timeElapsed = 0,
	totalScore = 0,
	timeElapsedIntervalID,
	dateObject = new Date(null);

// Create object to track which letters are currently on the screen
for(var i=0; i<charset.length; i++){
	lettersOnScreen[charset[i]] = [];
}

function playGame(){
	// Initialize variables
	gameInPlay = true;
	addLetterInterval = 1000;
	lettersLeftInRound = 20;
	timeElapsed = 0;
	totalScore = 0;
	
	// Disable 'Start Game' button
	$('#startButton').prop('disabled', true).addClass('disabled');

	// Reset game from a previous round if applicable
	$('.letterInPlay').each(function(){
		$(this).remove();
	});
	$('#gameContainer').removeClass('game-over');

	// Set Time Elapsed
	timeElapsedIntervalID = setInterval(function(){
		timeElapsed++;
		dateObject.setTime(timeElapsed * 1000);
		$('#timeElapsed').text(dateObject.toISOString().substr(14, 5));
	}, 1000);

	// Begin game
	addLetter();
}

function addLetter(){
	if(!gameInPlay){
		return;
	}

	// Get a random letter from the charset
	var newLetter = charset.charAt(Math.floor(Math.random() * charset.length));

	// Give the new letter a unique id for future reference
	var letterID = Date.now();

	// Add the new letter to the game
	$('#gameContainer').append("<div class='letterInPlay' id='" + letterID + "'>" + newLetter + "</div>");

	// Make letter move right across the container until it has reached the right side
	var newElement = $('#'+letterID);
	var intervalID = setInterval(function(){
		var rightPosition = newElement.position().left + Math.max(newElement[0].clientWidth, newElement[0].offsetWidth, newElement[0].scrollWidth);		

		if(rightPosition < 999){
			$('#'+letterID).animate({'left': '+=5'}, 1);

			// Make the letter turn red as it goes across the screen
			var letterColor = 'rgb(' + Math.min(255, rightPosition/4) + ',0,0)';
			$('#'+letterID).css({'color': letterColor});
		} else {
			// End the game when a letter reaches the right side of the container
			endGame();
			return;
		}
	}, 50);

	// Track all existing letters in lettersOnScreen object
	lettersOnScreen[newLetter].push({
		'letterID': letterID,
		'intervalID': intervalID
	});

	// Determine if the interval between letters has changed and add a new letter
	lettersLeftInRound--;
	if( lettersLeftInRound == 0 ) {
		addLetterInterval *= 0.9;
		lettersLeftInRound = 20;
	}
	setTimeout(addLetter, addLetterInterval);
}

function deleteLetter(letter){
	// Choose the oldest instance of the given letter
	var letterToDelete = lettersOnScreen[letter].shift();

	// Clear the interval that was created to make it move across the screen
	clearInterval(letterToDelete.intervalID);

	// Delete the element
	$('#'+letterToDelete.letterID).remove();
}

function updateScore(){
	$('#totalScore').text(totalScore);
	if( totalScore < 0 ){
		$('#totalScore')
			.addClass('negativeScore')
			.removeClass('positiveScore');
	} else if( totalScore > 0 ){
		$('#totalScore')
			.addClass('positiveScore')
			.removeClass('negativeScore');
	}
}

function endGame(){
	gameInPlay = false;
	$('#startButton').prop('disabled', false).removeClass('disabled').text('Replay Game');

	// Stop timer
	clearInterval(timeElapsedIntervalID);

	// Stop moving existing letters
	for(var i=0; i<charset.length; i++){
		var instancesOfLetter = lettersOnScreen[charset[i]];
		for(var j=0; j<instancesOfLetter.length; j++){
			clearInterval(instancesOfLetter[j].intervalID);
		}
	}

	// Show user that game is over
	$('#gameContainer').addClass('game-over');
}

$(document).ready(function(){
	$('#startButton').prop('disabled', false).removeClass('disabled');

	$('body').on('keyup', function(e){
		if(!gameInPlay)
			return;
		// If user pressed a letter on the keyboard
		if(e.keyCode > 64 && e.keyCode < 91){
			// Remove oldest instance of key pressed
			if(lettersOnScreen[e.key].length > 0){
				deleteLetter(e.key);
				updateScore(++totalScore);
			} else {
				updateScore(--totalScore);
			}
		}

		// If user pressed the ESCAPE key
		if( e.keyCode == 27 ) {
			endGame();
		}
	});
});