function showResult(title,score,total){

document.getElementById("resultGame").innerText = title;

document.getElementById("resultScore").innerText =
score + " / " + total;

document.getElementById("resultPopup").style.display="flex";

}

function goHome(){
  
window.history.back();
  
}
