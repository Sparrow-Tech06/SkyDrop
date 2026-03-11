let db;

const request = indexedDB.open("QuizWallet",1);

request.onupgradeneeded = function(e){

db = e.target.result;

db.createObjectStore("wallet",{keyPath:"id"});

};

request.onsuccess = function(e){

db = e.target.result;

loadCoins();

};

function loadCoins(){

const tx = db.transaction("wallet","readonly");

const store = tx.objectStore("wallet");

const get = store.get("user");

get.onsuccess = function(){

let coins = 0;

if(get.result){

coins = get.result.coins;

}

document.getElementById("coinAmount").innerText = coins;

};

}
