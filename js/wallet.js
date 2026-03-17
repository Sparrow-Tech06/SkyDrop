let db;

const request = indexedDB.open("QuizWallet", 1);

/* FIRST TIME DB CREATE */

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

    setTimeout(() => {
        loadCoins();
        loadHistory();
    }, 800);

};

request.onerror = function (e) {
    console.error("DB Error:", e);
};


/* LOAD COINS */

function loadCoins() {

    const tx = db.transaction("wallet", "readonly");
    const store = tx.objectStore("wallet");

    const get = store.get("user");

    get.onsuccess = () => {

        const coins = get.result ? get.result.coins : 0;

        document.getElementById("coinAmount").innerText =
            coins.toLocaleString();

    };

}


/* LOAD HISTORY */

function loadHistory() {

    const tx = db.transaction("history", "readonly");
    const store = tx.objectStore("history");

    const items = [];

    store.openCursor().onsuccess = function (e) {

        const cursor = e.target.result;

        if (cursor) {

            items.push(cursor.value);
            cursor.continue();

        } else {

            renderUI(items);

        }

    };

}


/* RENDER UI */

function renderUI(items) {

    const list = document.getElementById("historyList");

    if (items.length === 0) {

        list.innerHTML = `
        <div class="empty-state">
            <i class="bi bi-emoji-expressionless fs-1"></i>
            <p class="mt-3">No history found</p>
        </div>`;

        return;
    }

    items.reverse();

    list.innerHTML = items.map(item => {

        const initial = item.game
            ? item.game.charAt(0).toUpperCase()
            : "G";

        return `
        <div class="history-card">
            <div class="game-icon">${initial}</div>

            <div class="info-col">
                <p class="game-name">${item.game}</p>
                <span class="date-text">${item.date}</span>
            </div>

            <div class="amount-col">+${item.coins}</div>
        </div>
        `;

    }).join("");

}

