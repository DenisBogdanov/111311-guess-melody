const QTY_OF_QUESTIONS = 10;
const INITIAL_QTY_OF_NOTES = 3;
const QUICK_ANSWER = 30;

const INITIAL_GAME = Object.freeze({
  level: 0,
  score: 0,
  notes: 3,
  time: 300
});

const points = {
  SLOW_ANSWER: 1,
  QUICK_ANSWER: 2,
  WRONG_ANSWER: 2
};


export const getScore = (answers, remainingNotes) => {
  if (!Array.isArray(answers)) {
    throw new Error(`First argument should be an array.`);
  }
  if (!Number.isInteger(remainingNotes)) {
    throw new Error(`Second argument should be an int.`);
  }
  if (answers.length !== QTY_OF_QUESTIONS) {
    return -1;
  }
  if (remainingNotes < 0 || remainingNotes > 3) {
    throw new Error(`Quantity of remaining notes should be from 0 to 3.`);
  }

  let qtyOfCorrectAnswers = answers.filter((answer) => answer.correct).length;
  if (qtyOfCorrectAnswers + (INITIAL_QTY_OF_NOTES - remainingNotes) !== QTY_OF_QUESTIONS) {
    throw new Error(`Quantity of correct and incorrect answers should be equal to 10.`);
  }

  let score = 0;

  answers.forEach((answer) => {
    if (answer.correct && answer.time < QUICK_ANSWER) {
      score += points.QUICK_ANSWER;
    } else if (answer.correct) {
      score += points.SLOW_ANSWER;
    } else {
      score -= points.WRONG_ANSWER;
    }
  });

  return score;
};


export const changeQtyOfLives = (notes) => {
  if (!Number.isInteger(notes)) {
    throw new Error(`First argument (quantity of notes) should be an integer.`);
  }
  if (notes < 0) {
    throw new Error(`First argument (quantity of notes) should be non-negative.`);
  }

  return Object.assign({}, INITIAL_GAME, {notes});
};
