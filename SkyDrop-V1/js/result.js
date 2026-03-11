const score=localStorage.getItem("score");
const total=localStorage.getItem("total");
const name=localStorage.getItem("quizName");

document.getElementById("quizName").innerText=name;

document.getElementById("score").innerText=score+" / "+total;

/* history protection */

history.pushState(null,null,location.href);

window.onpopstate=function(){

window.location.href="index.html";

};
