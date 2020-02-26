var timer = 50;
var score = 0;
var questions = ["Which operator separates statements within a for loop?", "How does one prevent bubbling of an event?"];
var answers = [":", ",", ";", "!", "preventDefault()", "stopPropogation()", "getItem()", "setItem()"];

function updateUI() {
  changeForms();
  for (var i = 0; i < questions.length; i++) {
    buildQuestion(i);
  };
}

function changeForms() {
  $("#startDiv").addClass("d-none").removeClass("d-flex").removeClass("flex-column");
  $(".formRow").removeClass("d-none");
};

function buildQuestion(index) {
  // Question and answer arrays.  Used to generate questions via indices

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

updateUI();