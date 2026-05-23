// js/mycoins.js

// ======================
// NORMAL QUIZ COINS
// ======================

function mycoin(quizId, quizName) {

    // GET EXISTING COINS

    let coins = parseInt(
        localStorage.getItem("coins")
    ) || 0;

    // ADD 10 COINS

    coins += 10;

    // SAVE COINS

    localStorage.setItem("coins", coins);

    // HISTORY

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.push({
        type: "quiz",
        quizId: quizId,
        quiz: quizName,
        reward: 10,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    console.log("10 coins added for quiz:", quizName);

    // ANDROID NOTIFY

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

function getCoin(amount = 50, source = "Reward Ad") {

    // GET EXISTING COINS

    let coins = parseInt(
        localStorage.getItem("coins")
    ) || 0;

    // ADD REWARD COINS

    coins += amount;

    // SAVE COINS

    localStorage.setItem("coins", coins);

    // HISTORY

    let history = JSON.parse(
        localStorage.getItem("coinHistory")
    ) || [];

    history.push({
        type: "reward_ad",
        quizId: null,
        quiz: source,
        reward: amount,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    console.log(amount + " coins added from:", source);

}
