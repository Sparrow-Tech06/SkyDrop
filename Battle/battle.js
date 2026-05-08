let questions = [];
let currentQuestion = 0;
let userScore = 0;
let aiScore = 0;
let timer = 15;
let interval;

const difficulty = "medium";

document.getElementById("aiName").innerText =
  AI_LEVELS[difficulty].name;

async function loadQuestions() {

  const res = await fetch("questions.json");
  questions = await res.json();

  startBattle();
}

function startBattle() {
  showQuestion();
}

function showQuestion() {

  resetTimer();

  const q = questions[currentQuestion];

  document.getElementById("questionText").innerText = q.question;

  const optionsBox = document.getElementById("optionsBox");

  optionsBox.innerHTML = "";

  q.options.forEach(option => {

    const btn = document.createElement("button");

    btn.className = "option-btn";
    btn.innerText = option;

    btn.onclick = () => handleUserAnswer(btn, option);

    optionsBox.appendChild(btn);
  });

  startTimer();
  runAI(q);
}

function handleUserAnswer(button, selected) {

  clearInterval(interval);

  const q = questions[currentQuestion];

  disableOptions();

  if (selected === q.answer) {
    button.classList.add("correct");
    userScore++;
  } else {
    button.classList.add("wrong");
  }

  updateUI();

  setTimeout(nextQuestion, 2000);
}

function runAI(question) {

  const ai = generateAIAnswer(question, difficulty);

  setTimeout(() => {

    if (ai.isCorrect) {
      aiScore++;
      updateUI();
    }

  }, ai.delay);
}

function updateUI() {

  document.getElementById("userScore").innerText = userScore;
  document.getElementById("aiScore").innerText = aiScore;

  const total = questions.length;

  const userPercent = (userScore / total) * 100;
  const aiPercent = (aiScore / total) * 100;

  document.getElementById("userProgress").style.width =
    userPercent + "%";

  document.getElementById("aiProgress").style.width =
    aiPercent + "%";
}

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    finishBattle();
    return;
  }

  showQuestion();
}

function finishBattle() {

  let result = "Draw";

  if (userScore > aiScore) {
    result = "Victory";
  }

  if (aiScore > userScore) {
    result = "Defeat";
  }

  alert(`
${result}

You: ${userScore}
AI: ${aiScore}
  `);
}

function startTimer() {

  timer = 15;

  document.getElementById("timer").innerText = timer;

  interval = setInterval(() => {

    timer--;

    document.getElementById("timer").innerText = timer;

    if (timer <= 0) {

      clearInterval(interval);
      nextQuestion();
    }

  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
}

function disableOptions() {

  document
    .querySelectorAll(".option-btn")
    .forEach(btn => {
      btn.disabled = true;
    });
}

loadQuestions();
