fetch("data/quiz-data.json")
.then(res => res.json())
.then(data => {

const container=document.getElementById("quizContainer");

data.quizzes.forEach(quiz=>{

const card=`
<div class="col-md-4 mb-3">

<div class="card p-3 shadow-sm"
style="cursor:pointer"
onclick="openQuiz('${quiz.id}')">

<h5>${quiz.title}</h5>

<p>${quiz.questions.length} Questions</p>

</div>

</div>
`;

container.innerHTML+=card;

});

});

function openQuiz(id){

window.location.href="quiz.html?quiz="+id;

}
