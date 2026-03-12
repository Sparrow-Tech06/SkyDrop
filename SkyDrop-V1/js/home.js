fetch("data/quiz-data.json")
.then(res=>res.json())
.then(data=>{

const container=document.getElementById("quizContainer");

data.quizzes.forEach(q=>{

const card=`
<div class="col-md-4 mb-3">

<div class="card p-3 shadow-sm"
style="cursor:pointer"
onclick="openQuiz('${q.id}')">

<div class="d-flex align-items-center">

<img src="${q.icon}"
style="width:40px;height:40px;margin-right:10px">

<div>

<h6 class="mb-1">${q.title}</h6>
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
