fetch("data/categories.json")
.then(res => res.json())
.then(data => {

let container = document.getElementById("categoryContainer");

data.forEach(cat => {

let card = `
<div class="col-6">
<div class="category-card" style="background:${cat.color}">
<center>
<img src="img/${cat.icon}" width="60">
<h5 class="mt-2">${cat.title}</h5>
<p>${cat.questions} Questions</p>

<button class="explore-btn"
onclick="startQuiz('${cat.file}')">
Explore →
</button>

</center>
</div>
</div>
`;

container.innerHTML += card;

});

});

function startQuiz(file){

localStorage.setItem("quizFile",file);

window.location="quiz.html";

}
