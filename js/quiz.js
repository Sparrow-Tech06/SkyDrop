const params=new URLSearchParams(location.search);
const quizId=params.get("quiz");

let questions=[];
let current=0;
let score=0;

fetch("data/quiz-data.json")
.then(res=>res.json())
.then(data=>{

const quiz=data.quizzes.find(q=>q.id===quizId);

document.getElementById("quizTitle").innerText=quiz.title;

questions=quiz.questions;

loadQuestion();

});

function loadQuestion(){

const q=questions[current];

let html=`<h5>${q.question}</h5>`;

q.options.forEach((opt,i)=>{

html+=`
<div class="form-check">

<input class="form-check-input"
type="radio"
name="option"
value="${i}">

<label class="form-check-label">${opt}</label>

</div>
`;

});

document.getElementById("questionBox").innerHTML=html;

}

function nextQuestion(){

const selected=document.querySelector("input[name='option']:checked");

if(!selected){

alert("Select option");
return;

}

if(parseInt(selected.value)===questions[current].answer){

score++;

}

current++;

if(current<questions.length){

loadQuestion();

}else{

/* game end */

showResult(score,questions.length);

/* coin callback */

mycoin();

}

}
