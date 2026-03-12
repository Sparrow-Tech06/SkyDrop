function showResult(score,total){

document.getElementById("resultTitle").innerText="Quiz Result";

document.getElementById("resultScore").innerText=
score+" / "+total;

document.getElementById("resultPopup").style.display="flex";

}

function goHome(){
  
window.history.back();
  
}
