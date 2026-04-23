
const container = document.getElementById("quizContainer")

fetch("https://sparrow-tech06.github.io/SkyDrop/data/quiz-data.json")

.then(res=>res.json())

.then(data=>{

container.innerHTML=""

data.quizzes.forEach(q=>{

const card=`

<article class="col-6">

<div class="quiz-card" onclick="openQuiz('${q.id}')">

<img 
src="${q.icon}" 
class="quiz-img" 
loading="lazy"
alt="${q.title} icon">

<div class="caption">
<div class="quiz-title">
${q.title}
</div>

<div class="quiz-sub">
${q.questions.length} Questions
</div>
</div>

</div>

</article>

`

container.insertAdjacentHTML("beforeend",card)

})

})

.catch(()=>{

container.innerHTML=`

<div class="error">

<i class="bi bi-wifi-off fs-2"></i>

<p>Failed to load quizzes.</p>

</div>

`

})

function openQuiz(id){

window.location.href="quiz.html?quiz="+id

}
