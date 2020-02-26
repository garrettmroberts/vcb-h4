var timer = 50;
var score = 0;
var secondsLeft = 60;
var timer;
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
  for (i = 0; i < questions.length; i++) {
    globalIndex++;
    buildQuestion(i);
    // On user answer event, check if the answer is correct
  };
};

// Starts interval named 'timer'.  Pushes secondsLeft ot screen.
function startTimer() {
  timer = setInterval(function() {
    $("#timerEl").text(secondsLeft);
    secondsLeft--;
  }, 1000);
};

function changeForms() {
  $("#startDiv").addClass("d-none").removeClass("d-flex").removeClass("flex-column");
  $(".formRow").removeClass("d-none");
};

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

function checkIfCorrect(event) {
  if (correctAnswers[globalIndex].toString() === event.toString()) {
    score += 1;
    $("#scoreEl").text(score);
  } else {
    secondsLeft -= 5;
  }
};


// Testing functions
startTimer();
changeForms();
buildQuestion(1);