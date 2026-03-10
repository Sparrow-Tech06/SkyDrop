const score = localStorage.getItem("score");
const total = localStorage.getItem("total");
const name = localStorage.getItem("quizName");

document.getElementById("quizName").innerText = name;

document.getElementById("score").innerText =
score + " / " + total;


history.pushState(null,null,location.href);

window.onpopstate = function(){

location.href="index.html";

};
