let db;

const request=indexedDB.open("QuizWallet",1);

request.onupgradeneeded=function(e){

db=e.target.result;

db.createObjectStore("wallet",{keyPath:"id"});

};

request.onsuccess=function(e){

db=e.target.result;

};

/* callback function */

function mycoin(){

const tx=db.transaction("wallet","readwrite");

const store=tx.objectStore("wallet");

const get=store.get("user");

get.onsuccess=function(){

let coins=0;

if(get.result){

coins=get.result.coins;

}

coins+=10;

store.put({id:"user",coins:coins});

alert("10 Coins Added! Total: "+coins);

};

}
