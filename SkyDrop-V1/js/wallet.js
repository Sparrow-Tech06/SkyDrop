let db;

const request=indexedDB.open("QuizWallet",2);

request.onsuccess=function(e){

db=e.target.result;

loadWallet();

};

function loadWallet(){

const tx=db.transaction(["wallet","history"],"readonly");

const wallet=tx.objectStore("wallet");
const history=tx.objectStore("history");

wallet.get("user").onsuccess=function(e){

let coins=0;

if(e.target.result){
coins=e.target.result.coins;
}

document.getElementById("coinAmount").innerText=
coins+" Coins";

};

const list=document.getElementById("historyList");

history.openCursor().onsuccess=function(e){

const cursor=e.target.result;

if(cursor){

const item=cursor.value;

list.innerHTML+=`
<li class="list-group-item">
${item.game} +${item.coins}
<br>
<small>${item.time}</small>
</li>
`;

cursor.continue();

}

};

}
