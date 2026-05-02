(function(){

if(window.__rewardEngineLoaded) return;
window.__rewardEngineLoaded = true;

// SAFE STORAGE
function getS(k){
 try{return JSON.parse(localStorage.getItem(k)) || [];}
 catch{return [];}
}
function setS(k,v){localStorage.setItem(k,JSON.stringify(v));}

// ===== MASTER DATA =====
const BADGES = [
  { name: "Rookie Drop", required: 50, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/rookie-drop.png" },
  { name: "Loot Dropper", required: 100, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/loot-dropper.png" },
  { name: "Sky Scout", required: 130, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/sky-scout.png" },
  { name: "Drop Survivor", required: 150, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/drop-survivor.png" },
  { name: "Airdrop Raider", required: 180, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/airdrop-raider.png" },
  { name: "Storm Diver", required: 220, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/storm-diver.png" },
  { name: "Elite Dropper", required: 260, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/elite-dropper.png" },
  { name: "Sky Dominator", required: 320, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/sky-dominator.png" },
  { name: "Drop Legend", required: 400, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/drop-legend.png" },
  { name: "SkyDrop Immortal", required: 500, img: "https://sparrow-tech06.github.io/SkyDrop/assets/badges/skydrop-immortal.png" }
];

const LEVELS = [
{level:1, required:0, name:""},
{level:2, required:50, name:""},
{level:3, required:90, name:""},
{level:4, required:110, name:""}
];

// ===== GLOBAL CHECK =====
window.checkRewards = function(){

let coin = parseInt(localStorage.getItem("coins")) || 0;

let ub = getS("unlockedBadges");
let ul = getS("unlockedLevels");

// BADGES
BADGES.forEach(b=>{
 if(coin >= b.required && !ub.includes(b.name)){
  ub.push(b.name);
  setS("unlockedBadges", ub);

  window.onRewardUnlocked({
    type:"badge",
    title:b.name,
    subtitle:"Badge Unlocked",
    icon:b.img
  });
 }
});

// LEVELS
LEVELS.forEach(l=>{
 if(coin >= l.required && !ul.includes(l.level)){
  ul.push(l.level);
  setS("unlockedLevels", ul);

  window.onRewardUnlocked({
    type:"level",
    title:`Level ${l.level}`,
    subtitle:`${l.name} Unlocked`,
    icon:"https://sparrow-tech06.github.io/SkyDrop/assets/levels/level.png"
  });
 }
});

};

})();
