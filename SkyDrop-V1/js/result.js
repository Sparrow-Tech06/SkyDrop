let score = localStorage.getItem("score");
let total = localStorage.getItem("total");

document.getElementById("result")
.innerText = "Score: "+score+" / "+total;
