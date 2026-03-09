let quizFile = localStorage.getItem("quizFile");

let questions = [];
let index = 0;
let score = 0;

fetch("data/"+quizFile)
.then(res => res.json())
.then(data =>{

questions = data;

showQuestion();

});

function showQuestion(){

let q = questions[index];

document.getElementById("question").innerText = q.question;

let optionsHTML = "";

q.options.forEach(opt =>{

optionsHTML += `
<button onclick="checkAnswer('${opt}')">
${opt}
</button><br><br>
`;

});

document.getElementById("options").innerHTML = optionsHTML;

}

function checkAnswer(ans){

if(ans == questions[index].answer){
score++;
}

index++;

if(index < questions.length){
showQuestion();
}else{

localStorage.setItem("score",score);
localStorage.setItem("total",questions.length);

window.location="result.html";

}

}
