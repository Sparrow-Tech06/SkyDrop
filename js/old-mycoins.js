let db;

const request=indexedDB.open("QuizWallet",1);

request.onupgradeneeded=function(e){

db=e.target.result;

db.createObjectStore("wallet",{keyPath:"id"});
db.createObjectStore("history",{autoIncrement:true});

};

request.onsuccess=function(e){

db=e.target.result;

};

function mycoin(gameName){

const tx=db.transaction(["wallet","history"],"readwrite");

const wallet=tx.objectStore("wallet");
const history=tx.objectStore("history");

const get=wallet.get("user");

get.onsuccess=function(){

let coins=0;

if(get.result){

coins=get.result.coins;

}

coins+=10;

wallet.put({id:"user",coins:coins});

/* history save */

history.add({

game:gameName,
coins:10,
date:new Date().toLocaleString()

});

// alert("10 Coins Added");

};

}
