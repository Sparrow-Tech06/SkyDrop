const ResultPage = {

show({score, total, message, accuracy}){

  const el = document.getElementById("resultPage");
  const eligible = accuracy >= 50;

  el.innerHTML = `
    <div class="result-wrap">
      <div class="result-card">

        <h3>${message}</h3>

        <div class="score">${score} / ${total}</div>

        <div class="accuracy">Accuracy: ${accuracy.toFixed(0)}%</div>

        ${
          eligible
          ? `<div class="reward success">🎉 Coins Earned!</div>`
          : `<div class="reward fail">⚠️ Minimum 50% required to earn coins</div>`
        }

        <div class="btns">
          <button id="playAgain">🔁 Play Again</button>
          <button id="goBack">🔙 Back</button>
        </div>

      </div>
    </div>
  `;

  this.style();

  if(eligible){
    this.confetti();
  }

  document.getElementById("playAgain").onclick = () => location.reload();
  document.getElementById("goBack").onclick = () => window.history.back();
},

style(){

  if(document.getElementById("result-style")) return;

  const s = document.createElement("style");
  s.id = "result-style";

  s.innerHTML = `
  .result-wrap{
    display:flex;
    justify-content:center;
    padding-top:40px;
  }

  .result-card{
    background:#2c2c2e;
    padding:25px;
    border-radius:16px;
    border:2px solid #ff6a00;
    text-align:center;
    max-width:400px;
    width:100%;
  }

  .score{
    font-size:40px;
    margin:10px 0;
  }

  .accuracy{
    opacity:0.8;
    margin-bottom:8px;
  }

  .reward{
    padding:10px;
    border-radius:8px;
    font-weight:bold;
    margin-bottom:10px;
  }

  .success{background:#28a745;}
  .fail{background:#dc3545;}

  .btns button{
    width:45%;
    margin:5px;
    padding:10px;
    border:none;
    border-radius:8px;
    background:#ff6a00;
    color:#fff;
  }

  .confetti{
    position:fixed;
    width:6px;
    height:6px;
    top:-10px;
    animation:fall linear forwards;
  }

  @keyframes fall{
    to{
      transform:translateY(100vh) rotate(360deg);
      opacity:0;
    }
  }
  `;

  document.head.appendChild(s);
},

confetti(){

  for(let i=0;i<70;i++){

    const c = document.createElement("div");
    c.className = "confetti";

    c.style.left = Math.random()*100+"%";
    c.style.background = `hsl(${Math.random()*360},100%,50%)`;
    c.style.animationDuration = (1.5 + Math.random())+"s";

    document.body.appendChild(c);

    setTimeout(()=>c.remove(),2000);
  }
}

};
