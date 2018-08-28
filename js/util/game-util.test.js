import {assert} from 'chai';
import {getScore} from './game-util';

const MOCK_QUICK_ANSWERS = [];
const MOCK_SLOW_ANSWERS = [];
const MOCK_HALF_QUICK_ANSWERS = [];

for (let i = 0; i < 10; i++) {
  MOCK_QUICK_ANSWERS[i] = {correct: true, time: 29};
  MOCK_SLOW_ANSWERS[i] = {correct: true, time: 31};
  MOCK_HALF_QUICK_ANSWERS[i] = i % 2 === 0 ? {correct: true, time: 29} : {correct: true, time: 31};
}

describe(`getScore`, () => {

  it(`should return -1 when quantity of answers < 10`, () => {
    assert.equal(getScore([], 3), -1);
  });

  it(`should allow only array as first argument`, () => {
    assert.throws(() => getScore(true, 2), `First argument should be an array.`);
    assert.throws(() => getScore(1, 2), `First argument should be an array.`);
    assert.throws(() => getScore({}, 2), `First argument should be an array.`);
    assert.throws(() => getScore(`Hello`, 2), `First argument should be an array.`);
  });

  it(`shouldn't allow negative values for quantity of notes`, () => {
    assert.throws(() => getScore(MOCK_QUICK_ANSWERS, -1), `Quantity of remaining notes should be from 0 to 3.`);
  });

  it(`should throw an exception when quantity of correct answers and mistakes not equal to 10`, () => {
    assert.throws(() => getScore(MOCK_QUICK_ANSWERS, 1), `Quantity of correct and incorrect answers should be equal to 10.`);
  });

  it(`should return correct score when all answers correct`, () => {
    assert.equal(getScore(MOCK_SLOW_ANSWERS, 3), 10);
    assert.equal(getScore(MOCK_QUICK_ANSWERS, 3), 20);
    assert.equal(getScore(MOCK_HALF_QUICK_ANSWERS, 3), 15);
  });

  it(`should return correct score for one mistake in answers`, () => {
    const mockSlowAnswersWithOneMistake = Object.assign(MOCK_SLOW_ANSWERS);
    mockSlowAnswersWithOneMistake[9].correct = false;
    assert.equal(getScore(mockSlowAnswersWithOneMistake, 2), 7);

    const mockFastAnswersWithOneMistake = Object.assign(MOCK_QUICK_ANSWERS);
    mockFastAnswersWithOneMistake[9].correct = false;
    assert.equal(getScore(MOCK_QUICK_ANSWERS, 2), 16);
  });

  it(`should return correct score for three mistakes in answers`, () => {
    const mockSlowAnswersWithOneMistake = Object.assign(MOCK_SLOW_ANSWERS);
    mockSlowAnswersWithOneMistake[7].correct = false;
    mockSlowAnswersWithOneMistake[8].correct = false;
    mockSlowAnswersWithOneMistake[9].correct = false;
    assert.equal(getScore(mockSlowAnswersWithOneMistake, 0), 1);

    const mockFastAnswersWithOneMistake = Object.assign(MOCK_QUICK_ANSWERS);
    mockFastAnswersWithOneMistake[7].correct = false;
    mockFastAnswersWithOneMistake[8].correct = false;
    mockFastAnswersWithOneMistake[9].correct = false;
    assert.equal(getScore(MOCK_QUICK_ANSWERS, 0), 8);
  });

});
