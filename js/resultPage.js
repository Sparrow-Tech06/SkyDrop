const ResultPage = {

  show({score, total, message, accuracy}){

    const el = document.getElementById("resultPage");

    const rewardEligible = accuracy >= 50;

    el.innerHTML = `
      <div class="result-wrap">
        <div class="result-card">

          <h3>${message}</h3>

          <img src="assets/trophy.gif" class="trophy img-fluid" drawable="false" loading="lazy">

          <div class="score">${score} / ${total}</div>

          <div class="accuracy">
            Accuracy: ${accuracy.toFixed(0)}%
          </div>

          ${
            rewardEligible
            ? `<div class="reward success"> FirePoints Added </div>`
            : `<div class="reward fail"> Keep going! Reach minimum 50% to get rewards </div>`
          }

          <div class="btns">
            <button id="playAgain"> Play Again </button>
            <button id="goBack"> Home </button>
          </div>

        </div>
      </div>
    `;

    this.style();

    if(rewardEligible){
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
    `;

    document.head.appendChild(s);
  },

  confetti(){

    for(let i=0;i<60;i++){

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
