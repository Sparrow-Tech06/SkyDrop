// ================================
// SKYDROP STATS MANAGER
// ================================

const StatsManager = {

  // SAVE GAME RESULT
  saveGame(data){

    let history =
    JSON.parse(localStorage.getItem("gameHistory")) || [];

    history.push({

      gameId: data.gameId,

      gameName: data.gameName,

      score: data.score,

      total: data.total,

      wrong: data.wrong,

      accuracy: data.accuracy,

      playedAt: Date.now()

    });

    localStorage.setItem(
      "gameHistory",
      JSON.stringify(history)
    );

  },



  // GET ALL HISTORY
  getHistory(){

    return JSON.parse(
      localStorage.getItem("gameHistory")
    ) || [];

  },



  // TOTAL PLAYED
  totalPlayed(){

    return this.getHistory().length;

  },



  // MOST PLAYED RANKING
  topGames(){

    const history = this.getHistory();

    const counts = {};

    history.forEach(game=>{

      counts[game.gameName] =
      (counts[game.gameName] || 0) + 1;

    });

    return Object.entries(counts)

    .sort((a,b)=>b[1]-a[1]);

  },



  // BEST SCORE GAME
  bestScore(){

    const history = this.getHistory();

    if(!history.length) return null;

    let best = history[0];

    history.forEach(game=>{

      if(game.score > best.score){

        best = game;

      }

    });

    return best;

  }

};
