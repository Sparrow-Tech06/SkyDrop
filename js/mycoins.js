// ======================
// QUIZ / GAME COINS
// ======================

function myCoin(amount = 0, source = "Unknown") {

    // TOTAL COINS

    let coins = parseInt(localStorage.getItem("myCoins")) || 0;

    coins += amount;

    localStorage.setItem("myCoins", coins);

    // HISTORY

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.unshift({
        amount: amount,
        source: source,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    // ONLY FOR QUIZ/GAME

    if (
        window.Android &&
        typeof Android.onCoinAdded === "function"
    ) {

        Android.onCoinAdded();
    }
}

// ======================
// REWARD BONUS COINS
// ======================

function getCoin(amount = 0, source = "Reward Bonus") {

    // TOTAL COINS

    let coins = parseInt(localStorage.getItem("myCoins")) || 0;

    coins += amount;

    localStorage.setItem("myCoins", coins);

    // HISTORY

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.unshift({
        amount: amount,
        source: source,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    // NO ANDROID CALLBACK HERE
}
