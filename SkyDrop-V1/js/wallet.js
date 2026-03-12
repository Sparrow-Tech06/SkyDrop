let db;

const request = indexedDB.open("QuizWallet",2);

request.onupgradeneeded = function(e){

db = e.target.result;

if(!db.objectStoreNames.contains("wallet")){
db.createObjectStore("wallet",{keyPath:"id"});
}

if(!db.objectStoreNames.contains("history")){
db.createObjectStore("history",{autoIncrement:true});
}

};

request.onsuccess = function(e){

db = e.target.result;

loadWallet();

};

request.onerror = function(){

console.log("DB Error");

};


function loadWallet(){

const tx = db.transaction(["wallet","history"],"readonly");

const walletStore = tx.objectStore("wallet");
const historyStore = tx.objectStore("history");


/* load total coins */

walletStore.get("user").onsuccess = function(e){

let coins = 0;

if(e.target.result){
coins = e.target.result.coins;
}

document.getElementById("coinAmount").innerText =
coins + " Coins";

};


/* load history */

const list = document.getElementById("historyList");

list.innerHTML = "";

historyStore.openCursor(null,"prev").onsuccess = function(e){

const cursor = e.target.result;

if(cursor){

const item = cursor.value;

const li = document.createElement("li");

li.className = "list-group-item";

li.innerHTML = `
<strong>${item.game}</strong>
<span class="text-success"> +${item.coins}</span>
<br>
<small class="text-muted">${item.time}</small>
`;

list.appendChild(li);

cursor.continue();

}

else{

if(list.innerHTML === ""){
list.innerHTML = `<li class="list-group-item text-muted">
No coin history yet
</li>`;
}

}

};

}
