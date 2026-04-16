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
{name:"Rookie Drop",required:50,img:"https://sparrow-tech06.github.io/SkyDrop/assets/badges/rookie-drop.png"},
{name:"Loot Hunter",required:100,img:"https://sparrow-tech06.github.io/SkyDrop/assets/badges/Loot Hunter.png"},
{name:"Battle Scout",required:200,img:"https://sparrow-tech06.github.io/SkyDrop/assets/badges/Puzzle Solver.png"},
{name:"Survivor Rank",required:400,img:"https://sparrow-tech06.github.io/SkyDrop/assets/badges/Brain Booster.png"}
];

const LEVELS = [
{level:1, required:0, name:""},
{level:2, required:100, name:""},
{level:3, required:300, name:""},
{level:4, required:700, name:""}
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
