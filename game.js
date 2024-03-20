var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
let started = false; 
let level = 0;

// upload sounds
const redSound = new Audio("./sounds/red.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

// play sounds
function playSound(name) {
  switch (name) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrongSound.play();
      break;
  }
}


function nextSequence() {

  level++; 
  $("#level-title").text(`Level ${level}`); 

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log(randomChosenColour);

  const buttonToAnimate = $(`#${randomChosenColour}`);
  
  playSound(randomChosenColour);
  animatePress(randomChosenColour); 
  
  buttonToAnimate.fadeToggle(250, function() {
    setTimeout(function() {
      buttonToAnimate.show();
    }, 0);
  });
}

// Eventlistner click
function buttonHandler(event) {
  const userChosenColour = event.target.id;

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour); 
  
 
  setTimeout(function() {
    $(`#${userChosenColour}`).removeClass("pressed");
  }, 100);
}

// Animate click
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");


  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);

    
    checkAnswer(userClickedPattern.length - 1);
}

// reboot game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = []; 

}

// Check the answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Sucesso");
    if (userClickedPattern.length === gamePattern.length) {
      if (arraysEqual(userClickedPattern, gamePattern)) {
        setTimeout(function() {
          userClickedPattern.length = 0;
          nextSequence();
        }, 1000);
      } else {
        console.log("Sequência errada");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver(); 
      }
    }
  } else {
    console.log("Errado");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver(); 
  }
}


function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}


buttonColours.forEach(function(colour) {
  const button = $(`#${colour}`);
  button.on("click", buttonHandler);
});


$(document).keydown(function() {
  if (!started || $("#level-title").text().includes("Game Over")) { // Check for "Game Over" text
    nextSequence();
    started = true;
    $("#level-title").text(`Level ${level}`); // Reset level title
  }
});

