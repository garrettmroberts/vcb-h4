var timer;
var score = 0;
var secondsLeft = 60;
var isWaiting = true;
var questions = ["Which operator separates statements within a for loop?", "How does one prevent bubbling of an event?"];
var answers = [":", ",", ";", "!", "preventDefault()", "stopPropogation()", "getItem()", "setItem()"];
var correctAnswers = [2, 5];
var globalIndex = 0;

// Begins program when Start Button is pressed.
$("#startButton").on("click", updateUI);
$(".answerButton").on("click", function() {
  var userChoice = $(this).val();
  checkIfCorrect(userChoice);
});

// All of the main quiz logic is stored here.
function updateUI() {
  startTimer();
  changeForms();
  // For loop updates UI to next question on user event
  for (i = 0; i < questions.length; i++) {
    globalIndex++;
    buildQuestion(i);
    // On user answer event, check if the answer is correct
  };
};

// Starts interval named 'timer'.  Pushes secondsLeft on screen.
function startTimer() {
  timer = setInterval(function() {
    $("#timerEl").text(secondsLeft);
    secondsLeft--;
  }, 1000);
};

// Changes from start form to quiz form
function changeForms() {
  $("#startDiv").addClass("d-none").removeClass("d-flex").removeClass("flex-column");
  $(".formRow").removeClass("d-none");
};

// Builds a question and answer mix based on a given index arg
function buildQuestion(index) {
  // Sets Form Question
  $("#formQuestion").text(questions[index]).attr("for", "question" + (index + 1));

  // Set Form Answer buttons
  var buttons = $("button");
  var answerIndex = 0;
  if (index > 0) {
    var answerIndex = index * 4;
  }

  // Populates answer buttons
  $("#button1").text(answers[answerIndex]);
  $("#button2").text(answers[answerIndex + 1]);
  $("#button3").text(answers[answerIndex + 2]);
  $("#button4").text(answers[answerIndex + 3]);
};

// Asseses user choice vs correct answer.  Requires user input value.
function checkIfCorrect(event) {
  // Increments score if values are equal
  if (correctAnswers[globalIndex].toString() === event.toString()) {
    score += 1;
    $("#scoreEl").text(score);
    // removes 5 seconds from secondsLeft if answer is incorrect
  } else {
    secondsLeft -= 5;
  }
};


// Testing functions
startTimer();
changeForms();
buildQuestion(1);