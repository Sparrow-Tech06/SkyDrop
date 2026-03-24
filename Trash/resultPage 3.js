const ResultPage = {

  show({score, total, message}){

    const el = document.getElementById("resultPage");

    el.innerHTML = `
      <div class="result-wrap">
        <div class="result-card">

          <h3>${message}</h3>

          <div class="score">${score} / ${total}</div>

          <div class="btns">
            <button id="playAgain">🔁 Play Again</button>
            <button id="goBack">🔙 Back</button>
          </div>

        </div>
      </div>
    `;

    this.style();
    this.confetti();

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
        width:100%;
        max-width:400px;
      }

      .score{
        font-size:40px;
        font-weight:bold;
        margin:10px 0;
      }

      .btns button{
        background:#ff6a00;
        border:none;
        padding:10px;
        margin:5px;
        border-radius:8px;
        color:#fff;
        width:45%;
      }

      .confetti{
        position:fixed;
        width:6px;
        height:6px;
        background:red;
        top:-10px;
        animation:fall 2s linear forwards;
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
