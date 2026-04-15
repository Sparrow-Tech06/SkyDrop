(function(){

if(window.__rewardPopupLoaded) return;
window.__rewardPopupLoaded = true;

let queue = [];
let active = false;

function init(){

const overlay = document.createElement("div");
overlay.id = "rewardOverlay";

overlay.innerHTML = `
<div class="reward-box">
  <div class="reward-glow"></div>

  <img id="rIcon" class="r-icon">
  <h3 id="rTitle"></h3>
  <p id="rSub"></p>

  <button id="rClose">OK</button>
</div>
`;

document.body.appendChild(overlay);

// STYLE
const style = document.createElement("style");
style.innerHTML = `
#rewardOverlay{
 position:fixed; inset:0;
 background:rgba(0,0,0,0.85);
 display:flex; justify-content:center; align-items:center;
 z-index:99999;
 opacity:0; visibility:hidden; transition:.25s;
}
#rewardOverlay.active{opacity:1; visibility:visible;}

.reward-box{
 background:#111;
 padding:25px;
 border-radius:16px;
 text-align:center;
 color:#fff;
 width:90%; max-width:320px;
 position:relative;
}

.reward-glow{
 position:absolute;
 width:200%; height:200%;
 background:radial-gradient(circle,rgba(255,200,0,.25),transparent);
 top:-50%; left:-50%;
 animation:spin 5s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg);}}

.r-icon{width:80px;margin-bottom:10px;}
#rClose{
 margin-top:15px;width:100%;
 background:#ffcc00;border:none;
 padding:10px;border-radius:10px;font-weight:bold;
}
`;
document.head.appendChild(style);

document.getElementById("rClose").onclick = ()=>{
  overlay.classList.remove("active");
  active = false;
  showNext();
};

function showNext(){
 if(queue.length === 0) return;

 const d = queue.shift();

 document.getElementById("rIcon").src = d.icon || "";
 document.getElementById("rTitle").innerText = d.title || "";
 document.getElementById("rSub").innerText = d.subtitle || "";

 overlay.classList.add("active");
 active = true;
}

// GLOBAL CALLBACK
window.onRewardUnlocked = function(data){
 if(!data) return;
 queue.push(data);
 if(!active) showNext();
};

}

document.readyState === "loading"
 ? document.addEventListener("DOMContentLoaded", init)
 : init();

})();

