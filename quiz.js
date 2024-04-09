const questions = [
  {
    question: "which of the following is the tallest building in the world",
    answers: [
      { text: "Merdeka 118", correct: false },
      { text: "Burj Khalifa", correct: true },
      { text: "Makkah Royal Clock Tower", correct: false },
      { text: "Burj Khalifa", correct: false },
    ],
  },
  {
    question: "which of the following is correct",
    answers: [
      { text: "encyclopedia", correct: true },
      { text: "enciclopedia", correct: false },
      { text: "encyclopidia", correct: false },
      { text: "enciclopedea", correct: false },
    ],
  },
  {
    question: "which is the smallest country in the world",
    answers: [
      { text: "monaco", correct: false },
      { text: "peru", correct: false },
      { text: "vatican city", correct: true },
      { text: "tuvalu", correct: false },
    ],
  },
  {
    question: "how many countries are in the world",
    answers: [
      { text: "235", correct: false },
      { text: "196", correct: false },
      { text: "192", correct: false },
      { text: "195", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Try again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
