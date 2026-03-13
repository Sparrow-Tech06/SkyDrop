let db;

const request=indexedDB.open("QuizWallet",1);

request.onsuccess=function(e){

db=e.target.result;

loadCoins();
loadHistory();

};

function loadCoins(){

const tx=db.transaction("wallet","readonly");
const store=tx.objectStore("wallet");

const get=store.get("user");

get.onsuccess=function(){

let coins=0;

if(get.result){

coins=get.result.coins;

}

document.getElementById("coinAmount").innerText=
coins+" Coins";

};

}

function loadHistory(){

const tx=db.transaction("history","readonly");
const store=tx.objectStore("history");

const req=store.openCursor();

req.onsuccess=function(e){

const cursor=e.target.result;

if(cursor){

const item=cursor.value;

const li=`
<li class="list-group-item">

${item.game} +${item.coins} coins
<br>
<small>${item.date}</small>

</li>
`;

document.getElementById("historyList").innerHTML+=li;

cursor.continue();

}

};

}
