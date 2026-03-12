let quizData = [];
let currentIndex = 0;
let userScore = 0;
let currentQuiz = null;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('quiz');

    const res = await fetch('data/quiz-data.json');
    const data = await res.json();
    currentQuiz = data.quizzes.find(q => q.id === quizId);

    if (!currentQuiz) return location.href = 'index.html';
    renderQuestion();
});

function renderQuestion() {
    const q = currentQuiz.questions[currentIndex];
    document.getElementById('quiz-title').innerText = currentQuiz.title;
    document.getElementById('q-counter').innerText = `${currentIndex + 1}/${currentQuiz.questions.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    const optionsHtml = q.options.map((opt, i) => `
        <input type="radio" name="quiz-opt" class="option-input" id="opt${i}" value="${i}">
        <label class="option-label animate__animated animate__fadeInUp" for="opt${i}">${opt}</label>
    `).join('');
    
    document.getElementById('options-list').innerHTML = optionsHtml;
    document.getElementById('progress-bar').style.width = `${((currentIndex) / currentQuiz.questions.length) * 100}%`;
}

document.getElementById('next-btn').addEventListener('click', async () => {
    const selected = document.querySelector('input[name="quiz-opt"]:checked');
    if (!selected) return alert("Please select an answer to survive!");

    if (parseInt(selected.value) === currentQuiz.questions[currentIndex].answer) {
        userScore++;
    }

    if (currentIndex < currentQuiz.questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        await mycoin(currentQuiz.title);
        showResultPopup(userScore, currentQuiz.questions.length, currentQuiz.title);
    }
});
