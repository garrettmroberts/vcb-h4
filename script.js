var timer;
var score = 0;
var secondsLeft = 60;
var questions = [
  {
    "question": "Which operator separates statements within a for loop?",
    "answers": [":", ",", ";", "!"],
    "correctAnswerIndex": "2"
  }, 
  {
    "question": "How does one prevent bubbling of an event?",
    "answers": ["preventDefault()", "stopPropogation()", "getItem()", "setItem()"],
    "correctAnswerIndex": "1"
  },
  {
    "question": "What are the attributes of the 'let' keyword?",
    "answers": ["cannot be redeclared", "cannot be reassigned", "both of these", "neither of these"],
    "correctAnswerIndex": "0" 
  },
  {
    "question": "Which Javascript object is not natively iterable?",
    "answers": ["strings", "arrays", "integers", "objects"],
    "correctAnswerIndex": "3"
  },
  {
    "question": "Which CSS selector has the highest level of specificity?",
    "answers": ["element", "classes", "!important", "ids"],
    "correctAnswerIndex": "2"
  },
  {
    "question": "Which is not a component of the MERN stack?",
    "answers": ["MySQL", "Node.js", "Express", "Native.js"],
    "correctAnswerIndex": "3"
  },
  {
    "question": "Which is not a Javascript popup function?",
    "answers": ["input()", "alert()", "prompt()", "confirm()"],
    "correctAnswerIndex": "0"
  },
  {
    "question": "Which jQuery method is used to create event listeners?",
    "answers": [".html()", ".on()", ".text()", ".attr()"],
    "correctAnswerIndex": "1"
  },
  {
    "question": "Which coding platform is the best?",
    "answers": ["xCode", "Brackets", "Sublime", "vsCode"],
    "correctAnswerIndex": "3"
  },
];

var globalIndex = 0;

// Begins program when Start Button is pressed.
$("#startButton").on("click", beginQuiz);

// Processes answer click and processes accordingly
$(".answerButton").on("click", function() {
  var userChoice = $(this).val();
  checkIfCorrect(userChoice);
});

// Saves user's initials and scores to local storage.
$("#highScoreSubmit").on("click", setUserInput);


// All of the main quiz logic is stored here.
function beginQuiz() {
  startTimer();
  changeForms();
  buildQuestions();

};

// Starts interval named 'timer'.  Pushes secondsLeft on screen.
function startTimer() {
  timer = setInterval(function() {
    secondsLeft--;
    $("#timerEl").text(secondsLeft);
    if (secondsLeft === 0) {
      openHighScores();
    }
  }, 1000);
};

// Changes from start form to quiz form
function changeForms() {
  $("#startDiv").addClass("d-none").removeClass("d-flex").removeClass("flex-column");
  $(".formRow").removeClass("d-none");
};

// Builds a question and answer mix based on a given index arg
function buildQuestions() {

  // Sets Form Question
  $("#formQuestion").text(questions[globalIndex].question).attr("for", "question" + (globalIndex + 1));

  // Set Form Answer buttons
  var buttons = $("button");
  var answerIndex = 0;

  // Populates answer buttons
  $("#button1").text(questions[globalIndex].answers[0]);
  $("#button2").text(questions[globalIndex].answers[1]);
  $("#button3").text(questions[globalIndex].answers[2]);
  $("#button4").text(questions[globalIndex].answers[3]);
};

// Asseses user choice vs correct answer.  Requires user input value.  Updates to next question.
function checkIfCorrect(event) {
  // Increments score if correct
  if (event == questions[globalIndex].correctAnswerIndex) {
    score++;
    $("#scoreEl").text(score);
    // Lowers secondsLeft by 5 if wrong
  } else {
    secondsLeft -= 5;
  }
  // Increments global index in preparation of next form question
  globalIndex++;

  // Creates next question with globalIndex or shifts to high score screen if necessary
  if (globalIndex < questions.length) {
    buildQuestions();
  } else {
    openHighScores();
  }
};

function openHighScores() {
  clearInterval(timer);
  $(".formRow").addClass("d-none");
  $("#endDiv").removeClass("d-none");
  $("#answeredCorrect").text(score);
};

function setUserInput() {
  // Gets high Score list from local storage
  var oldItems = JSON.parse(localStorage.getItem('scoreList')) || [];
  // Gets initials from user
  var initials = $("#userInitialsInput").val()

  // Creates new user Object
  var user = {
    "name": initials,
    "highScore": score
  };
  // Appends new user to high score list
  oldItems.push(user);

  // pushes updated list to local storage
  localStorage.setItem("scoreList", JSON.stringify(oldItems));

  $("#userInitialsInput").addClass("d-none");
  $("#highScoreSubmit").addClass("d-none");
};


// Testing functions
// startTimer();
// buildQuestions(0);
changeForms();
openHighScores();