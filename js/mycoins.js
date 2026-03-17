let db;

const request = indexedDB.open("QuizWallet", 1);

/* CREATE DB STRUCTURE */

request.onupgradeneeded = function (e) {
    db = e.target.result;

    if (!db.objectStoreNames.contains("wallet")) {
        db.createObjectStore("wallet", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { autoIncrement: true });
    }
};

/* DB READY */

request.onsuccess = function (e) {
    db = e.target.result;
};

request.onerror = function () {
    console.error("DB Error");
};


/* 🔥 MAIN CALLBACK FUNCTION */

function mycoin(gameName) {

    if (!db) {
        alert("Database not ready");
        return;
    }

    const tx = db.transaction(["wallet", "history"], "readwrite");

    const walletStore = tx.objectStore("wallet");
    const historyStore = tx.objectStore("history");

    const getReq = walletStore.get("user");

    getReq.onsuccess = function () {

        let data = getReq.result;

        if (!data) {
            data = { id: "user", coins: 0 };
        }

        // ✅ ADD COINS
        data.coins += 10;

        walletStore.put(data);

        // ✅ ADD HISTORY ENTRY
        historyStore.add({
            game: gameName,
            coins: 10,
            date: new Date().toLocaleString()
        });

        console.log("✅ 10 coins added + history stored");
    };

}
