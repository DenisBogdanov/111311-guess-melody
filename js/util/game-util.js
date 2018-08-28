import {INITIAL_GAME, messages, points} from './const';

const QTY_OF_QUESTIONS = 10;
const INITIAL_QTY_OF_NOTES = 3;
const QUICK_ANSWER = 30;


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


export const showResult = (otherPlayersResults, currentPlayerResult) => {

  if (currentPlayerResult.notes < 0) {
    return messages.FAIL_LIVES_OVER;
  }
  if (currentPlayerResult.time <= 0) {
    return messages.FAIL_TIME_OVER;
  }

  otherPlayersResults.push(currentPlayerResult.score);
  otherPlayersResults.sort((a, b) => b - a);
  const position = otherPlayersResults.indexOf(currentPlayerResult.score) + 1;
  const percentile = Math.round((otherPlayersResults.length - position) / otherPlayersResults.length * 100);
  return messages.success(position, otherPlayersResults.length, percentile);
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


export const changeLevel = (level) => {
  if (!Number.isInteger(level)) {
    throw new Error(`First argument (level) should be an integer.`);
  }
  if (level < 0) {
    throw new Error(`First argument (level) should be non-negative.`);
  }

  return Object.assign({}, INITIAL_GAME, {level});
};


export const changeTimer = (time) => {
  if (!Number.isInteger(time)) {
    throw new Error(`First argument (time) should be an integer.`);
  }
  if (time < 0) {
    throw new Error(`First argument (time) should be non-negative.`);
  }

  return Object.assign({}, INITIAL_GAME, {time});
};
