//
// var randomColours = ["red","blue","green","yellow",];
// var gamePattern = [];
// var userClickedPattern = [];
// var userChosenColour;
// var intta = false;
//
// $(document).keypress(function() {
//   if (!intta) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });
//
//
// $(".btn").click(function(){userChosenColour = $(this).attr("id")
// userClickedPattern.push(userChosenColour);
//  playsound(userChosenColour);
//  animatePress(userChosenColour);
// });
// userClickedPattern.push(userChosenColour);
// console.log(userClickedPattern);
//
// function nextSequence()
// {
//   var randomNumber = Math.floor((Math.random() * 4) + 0);
//   var randomChosenColour = randomColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//   $("#"+randomChosenColour).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
// audio.play();
// playsound(audio);
// animatePress();
//   }
//
//
//
// function playsound(name)
// {
//
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
//
// }
// function animatePress(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {


  level = 0;
  gamePattern = [];
  started = false;
}
