const AI_LEVELS = {
  easy: {
    accuracy: 55,
    minDelay: 3000,
    maxDelay: 7000,
    name: "Noob AI"
  },

  medium: {
    accuracy: 75,
    minDelay: 2000,
    maxDelay: 5000,
    name: "Pro AI"
  },

  hard: {
    accuracy: 90,
    minDelay: 1000,
    maxDelay: 3000,
    name: "Master AI"
  }
};

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAIAnswer(question, level) {

  const config = AI_LEVELS[level];

  const isCorrect = Math.random() * 100 < config.accuracy;

  let selected;

  if (isCorrect) {
    selected = question.answer;
  } else {

    const wrongOptions = question.options.filter(
      o => o !== question.answer
    );

    selected = wrongOptions[
      Math.floor(Math.random() * wrongOptions.length)
    ];
  }

  return {
    selected,
    isCorrect,
    delay: getRandomDelay(config.minDelay, config.maxDelay)
  };
}
