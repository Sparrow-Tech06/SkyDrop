function showResult(score,total,title){

document.getElementById("resultTitle").innerText=title;

document.getElementById("resultScore").innerText=
score+" / "+total;

document.getElementById("resultPopup").style.display="flex";

}

function goHome(){

window.location.href="index.html";

}
