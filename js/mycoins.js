// js/mycoins.js

// get current coins
function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

// update coins in storage
function setCoins(value) {
    localStorage.setItem("coins", value);
}

// callback function (called after quiz ends)
function mycoin(quizTitle) {

    let currentCoins = getCoins();

    // add 10 coins
    let newCoins = currentCoins + 10;

    setCoins(newCoins);

    console.log(`Quiz "${quizTitle}" completed. +10 coins added.`);
    console.log(`Total Coins: ${newCoins}`);

    // optional: show alert or toast
    alert("🎉 You earned 10 coins!");
}
