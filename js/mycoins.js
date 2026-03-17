// js/mycoins.js

function mycoin(quizTitle) {

    const request = indexedDB.open("QuizWallet", 1);

    request.onsuccess = function (e) {

        const db = e.target.result;

        const tx = db.transaction(["wallet", "history"], "readwrite");

        const walletStore = tx.objectStore("wallet");
        const historyStore = tx.objectStore("history");

        const getUser = walletStore.get("user");

        getUser.onsuccess = function () {

            let currentCoins = 0;

            if (getUser.result) {
                currentCoins = getUser.result.coins;
            }

            let newCoins = currentCoins + 10;

            // update wallet
            walletStore.put({
                id: "user",
                coins: newCoins
            });

            // add history entry
            historyStore.add({
                game: quizTitle,
                coins: 10,
                date: new Date().toLocaleString()
            });

            console.log("Coins Added:", newCoins);

            alert("🎉 10 Coins Added to Wallet!");

        };

    };

    request.onerror = function () {
        console.error("DB Error while adding coins");
    };

}
