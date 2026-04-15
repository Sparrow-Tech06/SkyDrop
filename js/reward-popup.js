// ===== GLOBAL REWARD SYSTEM =====
(function(){

if(window.__rewardSystemLoaded) return;
window.__rewardSystemLoaded = true;

let queue = [];
let isShowing = false;

function init(){

const overlay = document.createElement("div");
overlay.id = "rewardOverlay";

overlay.innerHTML = `
<div class="reward-box">
  <div class="reward-glow"></div>

  <img id="rewardIcon" class="reward-icon">

  <h3 id="rewardTitle"></h3>
  <p id="rewardSubtitle"></p>

  <button id="rewardClose">OK</button>
</div>
`;

document.body.appendChild(overlay);

// STYLE
const style = document.createElement("style");
style.innerHTML = `
#rewardOverlay{
  position:fixed;
  top:0;left:0;
  width:100%;height:100%;
  background:rgba(0,0,0,0.85);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:99999;
  opacity:0;
  visibility:hidden;
  transition:0.25s;
}
#rewardOverlay.active{
  opacity:1;
  visibility:visible;
}

.reward-box{
  background:#0f0f0f;
  border-radius:16px;
  padding:25px;
  text-align:center;
  width:90%;
  max-width:320px;
  color:#fff;
  position:relative;
}

.reward-glow{
  position:absolute;
  width:200%;
  height:200%;
  background:radial-gradient(circle, rgba(255,200,0,0.25), transparent);
  top:-50%;left:-50%;
  animation:spin 5s linear infinite;
}
@keyframes spin{
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}

.reward-icon{
  width:80px;
  margin-bottom:10px;
  position:relative;
  z-index:1;
}

#rewardTitle{font-weight:700;}
#rewardSubtitle{font-size:14px;opacity:0.85;}

#rewardClose{
  margin-top:15px;
  width:100%;
  background:#ffcc00;
  border:none;
  padding:10px;
  border-radius:10px;
  font-weight:bold;
}
`;
document.head.appendChild(style);

// Close button
document.getElementById("rewardClose").onclick = ()=>{
  overlay.classList.remove("active");
  isShowing = false;
  showNext();
};

function showNext(){
  if(queue.length === 0) return;

  const data = queue.shift();

  document.getElementById("rewardIcon").src = data.icon || "";
  document.getElementById("rewardTitle").innerText = data.title || "";
  document.getElementById("rewardSubtitle").innerText = data.subtitle || "";

  overlay.classList.add("active");
  isShowing = true;
}

// GLOBAL CALLBACK
window.onRewardUnlocked = function(data){
  if(!data) return;
  queue.push(data);
  if(!isShowing) showNext();
};

}

// DOM ready fix
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
}else{
  init();
}

})();


