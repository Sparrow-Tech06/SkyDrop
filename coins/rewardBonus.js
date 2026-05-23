// rewardBonus.js

(function () {

    // ORIGINAL getCoin FUNCTION SAVE

    const originalGetCoin = window.getCoin;

    // OVERRIDE getCoin

    window.getCoin = function () {

        // TOTAL COINS

        let coins = parseInt(
            localStorage.getItem("myCoins")
        ) || 0;

        coins += 50;

        localStorage.setItem("myCoins", coins);

        // HISTORY

        let history = JSON.parse(
            localStorage.getItem("coinHistory")
        ) || [];

        history.unshift({
            amount: 50,
            source: "Reward Bonus",
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "coinHistory",
            JSON.stringify(history)
        );

        // OPTIONAL: CALL ORIGINAL FUNCTION

        if (typeof originalGetCoin === "function") {

            originalGetCoin();
        }

        console.log("Reward Bonus Added: 50");
    };

})();
