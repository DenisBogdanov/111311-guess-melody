export const INITIAL_GAME = Object.freeze({
  level: 0,
  score: 0,
  notes: 3,
  time: 300,
  answers: new Set()
});

export const messages = {
  FAIL_TIME_OVER: `Время вышло! Вы не успели отгадать все мелодии`,
  FAIL_LIVES_OVER: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  success: (place, qtyOfPlayers, percentile) => `Вы заняли ${place} место из ${qtyOfPlayers} игроков. Это лучше, чем у ${percentile}% игроков`
};

export const points = {
  SLOW_ANSWER: 1,
  QUICK_ANSWER: 2,
  WRONG_ANSWER: 2
};
