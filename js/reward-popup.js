(function(){

if(window.rewardPopupInitialized) return;
window.rewardPopupInitialized = true;

let queue = [];
let isShowing = false;

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
  z-index:9999;
  visibility:hidden;
  opacity:0;
  transition:0.3s;
}
#rewardOverlay.active{visibility:visible;opacity:1;}

.reward-box{
  background:#121212;
  border-radius:16px;
  padding:25px;
  text-align:center;
  width:85%;
  max-width:320px;
  color:#fff;
  position:relative;
}

.reward-glow{
  position:absolute;
  width:200%;
  height:200%;
  background:radial-gradient(circle, rgba(255,200,0,0.3), transparent);
  top:-50%;left:-50%;
  animation:spin 4s linear infinite;
}
@keyframes spin{
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}

.reward-icon{width:80px;margin-bottom:10px;}
#rewardTitle{font-weight:700;}
#rewardSubtitle{font-size:14px;opacity:0.8;}

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

document.getElementById("rewardClose").onclick = ()=>{
  overlay.classList.remove("active");
  isShowing = false;
  showNext();
};

function showNext(){
  if(queue.length === 0) return;

  const data = queue.shift();

  document.getElementById("rewardIcon").src = data.icon;
  document.getElementById("rewardTitle").innerText = data.title;
  document.getElementById("rewardSubtitle").innerText = data.subtitle;

  overlay.classList.add("active");
  isShowing = true;
}

// ✅ GLOBAL CALLBACK
window.onRewardUnlocked = function(data){
  queue.push(data);
  if(!isShowing) showNext();
};

})();
