let db;

const request = indexedDB.open("QuizWallet",1);

request.onupgradeneeded=function(e){

db=e.target.result;

if(!db.objectStoreNames.contains("wallet")){
db.createObjectStore("wallet",{keyPath:"id"});
}

if(!db.objectStoreNames.contains("history")){
db.createObjectStore("history",{autoIncrement:true});
}

};

request.onsuccess=function(e){
db=e.target.result;
console.log("DB Ready");
};

request.onerror=function(e){
console.error("DB Error",e);
};


/* ===================== ADD COINS ===================== */

function mycoin(gameName){

if(!db){
setTimeout(()=>mycoin(gameName),200);
return;
}

const tx=db.transaction(["wallet","history"],"readwrite");

const wallet=tx.objectStore("wallet");
const history=tx.objectStore("history");

const get=wallet.get("user");

get.onsuccess=function(){

let coins = get.result ? get.result.coins : 0;

coins += 10;

wallet.put({id:"user",coins:coins});

/* history */

history.add({
game:gameName,
coins:10,
date:new Date().toLocaleString()
});

};

/* debug */

tx.oncomplete=function(){
console.log("Coins Added Successfully");
};

tx.onerror=function(e){
console.error("Transaction Error",e);
};

/* Android callback */

if (window.Android && typeof Android.onCoinAdded === "function") {
Android.onCoinAdded();
}

}


/* ===================== GET COINS ===================== */

function getCoins(callback){

if(!db){
setTimeout(()=>getCoins(callback),200);
return;
}

const tx=db.transaction("wallet","readonly");
const store=tx.objectStore("wallet");

const get=store.get("user");

get.onsuccess=function(){
callback(get.result ? get.result.coins : 0);
};

}


/* ===================== GET HISTORY ===================== */

function getHistory(callback){

if(!db){
setTimeout(()=>getHistory(callback),200);
return;
}

const tx=db.transaction("history","readonly");
const store=tx.objectStore("history");

const data=[];

store.openCursor().onsuccess=function(e){

const cursor=e.target.result;

if(cursor){
data.push(cursor.value);
cursor.continue();
}else{
callback(data.reverse());
}

};

}
