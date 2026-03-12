/* get quiz id from url */

const params = new URLSearchParams(location.search);
const quizId = params.get("quiz");

let questions = [];
let current = 0;
let score = 0;
let quizTitle = "";


/* load quiz data */

fetch("data/quiz-data.json")
.then(res => res.json())
.then(data => {

const quiz = data.quizzes.find(q => q.id === quizId);

if(!quiz){
alert("Quiz not found");
window.location.href = "index.html";
return;
}

quizTitle = quiz.title;

document.getElementById("quizTitle").innerText = quiz.title;

questions = quiz.questions;

loadQuestion();

});


/* load question */

function loadQuestion(){

const q = questions[current];

let html = `<h5 class="mb-3">${q.question}</h5>`;

q.options.forEach((opt,i)=>{

html += `
<div class="form-check mb-2">

<input class="form-check-input"
type="radio"
name="option"
value="${i}"
id="opt${i}">

<label class="form-check-label" for="opt${i}">
${opt}
</label>

</div>
`;

});

document.getElementById("questionBox").innerHTML = html;

}


/* next question */

function nextQuestion(){

const selected =
document.querySelector("input[name='option']:checked");

if(!selected){

alert("Please select an answer");
return;

}

if(parseInt(selected.value) === questions[current].answer){
score++;
}

current++;


/* load next question */

if(current < questions.length){

loadQuestion();

}

/* quiz finished */

else{

showResult(quizTitle, score, questions.length);

/* coin reward callback */

if(typeof mycoin === "function"){
mycoin(quizTitle);
}

}

}



/* back button protection */

history.pushState(null,null,location.href);

window.onpopstate = function(){

if(confirm("Quiz is running. Exit quiz?")){

window.location.href="index.html";

}else{

history.pushState(null,null,location.href);

}

};

  
