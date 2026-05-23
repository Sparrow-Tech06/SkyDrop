```js id="g8m2xp"
// js/mycoins.js

// ======================
// QUIZ COINS
// ======================

function mycoin(quizId, quizName) {

    // GET CURRENT COINS

    let coins = parseInt(
        localStorage.getItem("coins")
    ) || 0;

    // ADD 10 COINS

    coins += 10;

    // SAVE TOTAL COINS

    localStorage.setItem("coins", coins);

    // ======================
    // SAVE HISTORY
    // ======================

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.push({
        quiz: quizName,
        reward: 10,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    // ======================
    // NOTIFY ANDROID
    // ======================

    if (
        window.Android &&
        typeof Android.onCoinAdded === "function"
    ) {

        Android.onCoinAdded(1);
    }
}

// ======================
// REWARDED AD COINS
// ======================

function getCoin(amount, source) {

    // GET CURRENT COINS

    let coins = parseInt(
        localStorage.getItem("coins")
    ) || 0;

    // ADD BONUS COINS

    coins += 50;

    // SAVE TOTAL COINS

    localStorage.setItem("coins", coins);

    // ======================
    // SAVE HISTORY
    // ======================

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.push({
        quiz: "Bonus",
        reward: 50,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    // ======================
    // NOTIFY ANDROID
    // ======================

    if (
        window.Android &&
        typeof Android.onCoinAdded === "function"
    ) {

        Android.onCoinAdded(1);
    }
}
