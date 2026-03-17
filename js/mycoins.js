// js/mycoins.js

function mycoin(quizId, quizName){

    // get existing coins
    let coins = parseInt(localStorage.getItem("coins")) || 0;

    // add 10 coins every time
    coins += 10;

    // save coins
    localStorage.setItem("coins", coins);

    // save history
    let history = JSON.parse(localStorage.getItem("coinHistory")) || [];

    history.push({
        quiz: quizName,
        reward: 10,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("coinHistory", JSON.stringify(history));

    console.log("10 coins added for quiz:", quizName);
}
