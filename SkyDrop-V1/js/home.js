fetch("data/quiz-data.json")
.then(res=>res.json())
.then(data=>{

const container=document.getElementById("quizContainer");

data.quizzes.forEach(q=>{

const card=`

<div class="col-md-4 mb-3">

<div class="card shadow-sm p-3"
style="cursor:pointer"
onclick="openQuiz('${q.id}')">

<div class="d-flex align-items-center">

<img src="${q.icon}"
width="40"
class="me-3">

<div>

<h6>${q.title}</h6>
<small>${q.questions.length} Questions</small>

</div>

</div>

</div>

</div>
`;

container.innerHTML+=card;

});

});

function openQuiz(id){

window.location.href="quiz.html?quiz="+id;

}
