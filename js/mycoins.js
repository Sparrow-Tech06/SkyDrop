// js/mycoins.js

function mycoin(quizId, quizName){

    let rewardKey = "reward_" + quizId;

    // prevent duplicate reward
    if(localStorage.getItem(rewardKey)){
        console.log("Already rewarded for this quiz");
        return;
    }

    let coins = parseInt(localStorage.getItem("coins")) || 0;

    coins += 10;

    localStorage.setItem("coins", coins);
    localStorage.setItem(rewardKey, true);

    // history save
    let history = JSON.parse(localStorage.getItem("coinHistory")) || [];

    history.push({
        quiz: quizName,
        reward: 10,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("coinHistory", JSON.stringify(history));

    console.log("10 coins added");
}
