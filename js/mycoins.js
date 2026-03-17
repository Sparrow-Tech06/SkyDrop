let db;

// Open / Create DB
const request = indexedDB.open("QuizAppDB", 1);

request.onupgradeneeded = function (e) {
    db = e.target.result;

    if (!db.objectStoreNames.contains("wallet")) {
        const store = db.createObjectStore("wallet", { keyPath: "id" });
        store.put({ id: 1, coins: 0 }); // default wallet
    }
};

request.onsuccess = function (e) {
    db = e.target.result;
};

request.onerror = function () {
    console.error("DB Error");
};


// 🔥 MAIN CALLBACK FUNCTION
function mycoin(quizName) {
    if (!db) {
        alert("DB not ready");
        return;
    }

    const tx = db.transaction("wallet", "readwrite");
    const store = tx.objectStore("wallet");

    const getReq = store.get(1);

    getReq.onsuccess = function () {
        let data = getReq.result;

        if (!data) {
            data = { id: 1, coins: 0 };
        }

        data.coins += 10; // 🎯 add 10 coins

        store.put(data);

        console.log(`✅ 10 coins added for quiz: ${quizName}`);
    };

    tx.oncomplete = function () {
        console.log("Transaction completed");
    };
}
