(function(){

if(window.__rewardEngineLoaded) return;
window.__rewardEngineLoaded = true;

// SAFE STORAGE
function getStorage(key){
  try{return JSON.parse(localStorage.getItem(key)) || [];}
  catch{return [];}
}
function setStorage(key,val){
  localStorage.setItem(key, JSON.stringify(val));
}

// ===== DATA (GLOBAL CONTROL) =====
const badges = [
{name:"Rookie Drop",required:50,img:"../assets/badges/rookie-drop.png"},
{name:"Loot Hunter",required:100,img:"../assets/badges/Loot Hunter.png"},
{name:"Battle Scout",required:200,img:"../assets/badges/Puzzle Solver.png"},
{name:"Survivor Rank",required:400,img:"../assets/badges/Brain Booster.png"}
];

const levels = [
{level:1, required:0, name:"Beginner"},
{level:2, required:100, name:"Rookie"},
{level:3, required:300, name:"Fighter"},
{level:4, required:700, name:"Warrior"}
];

// ===== MAIN CHECK FUNCTION =====
window.checkRewards = function(){

let coin = parseInt(localStorage.getItem("coins")) || 0;

let unlockedBadges = getStorage("unlockedBadges");
let unlockedLevels = getStorage("unlockedLevels");

// BADGES
badges.forEach(badge=>{
  if(coin >= badge.required && !unlockedBadges.includes(badge.name)){

    unlockedBadges.push(badge.name);
    setStorage("unlockedBadges", unlockedBadges);

    window.onRewardUnlocked({
      type:"badge",
      title:badge.name,
      subtitle:"Badge Unlocked 🎉",
      icon:badge.img
    });

  }
});

// LEVELS
levels.forEach(lvl=>{
  if(coin >= lvl.required && !unlockedLevels.includes(lvl.level)){

    unlockedLevels.push(lvl.level);
    setStorage("unlockedLevels", unlockedLevels);

    window.onRewardUnlocked({
      type:"level",
      title:`Level ${lvl.level}`,
      subtitle:`${lvl.name} Unlocked 🔥`,
      icon:"../assets/levels/level.png"
    });

  }
});

};

})();
