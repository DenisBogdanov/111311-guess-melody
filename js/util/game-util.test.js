import {assert} from 'chai';
import {getScore, changeQtyOfLives, changeLevel, changeTimer} from './game-util';

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


describe(`changeQtyOfLives`, () => {
  it(`should allow only integers as the first argument`, () => {
    assert.throws(() => changeQtyOfLives(true), `First argument (quantity of notes) should be an integer.`);
    assert.throws(() => changeQtyOfLives({}), `First argument (quantity of notes) should be an integer.`);
    assert.throws(() => changeQtyOfLives(null), `First argument (quantity of notes) should be an integer.`);
    assert.throws(() => changeQtyOfLives(), `First argument (quantity of notes) should be an integer.`);
  });

  it(`should allow only non-negative values as the first argument`, () => {
    assert.throws(() => changeQtyOfLives(-13), `First argument (quantity of notes) should be non-negative.`);
  });

  it(`should update quantity of notes`, () => {
    assert.equal(changeQtyOfLives(1).notes, 1);
    assert.equal(changeQtyOfLives(5).notes, 5);
    assert.equal(changeQtyOfLives(42).notes, 42);
    assert.equal(changeQtyOfLives(1001).notes, 1001);
  });
});


describe(`change level`, () => {
  it(`should allow only integers as the first argument`, () => {
    assert.throws(() => changeLevel(true), `First argument (level) should be an integer.`);
    assert.throws(() => changeLevel(null), `First argument (level) should be an integer.`);
    assert.throws(() => changeLevel({}), `First argument (level) should be an integer.`);
    assert.throws(() => changeLevel(2.5), `First argument (level) should be an integer.`);
  });

  it(`should allow only non-negative values as the first argument`, () => {
    assert.throws(() => changeLevel(-13), `First argument (level) should be non-negative.`);
  });

  it(`should update quantity of notes`, () => {
    assert.equal(changeLevel(1).level, 1);
    assert.equal(changeLevel(5).level, 5);
    assert.equal(changeLevel(42).level, 42);
    assert.equal(changeLevel(1001).level, 1001);
  });
});


describe(`change time`, () => {
  it(`should allow only integers as the first argument`, () => {
    assert.throws(() => changeTimer(true), `First argument (time) should be an integer.`);
    assert.throws(() => changeTimer(null), `First argument (time) should be an integer.`);
    assert.throws(() => changeTimer({}), `First argument (time) should be an integer.`);
    assert.throws(() => changeTimer(2.5), `First argument (time) should be an integer.`);
  });

  it(`should allow only non-negative values as the first argument`, () => {
    assert.throws(() => changeTimer(-13), `First argument (time) should be non-negative.`);
  });

  it(`should update quantity of notes`, () => {
    assert.equal(changeTimer(1).time, 1);
    assert.equal(changeTimer(5).time, 5);
    assert.equal(changeTimer(42).time, 42);
    assert.equal(changeTimer(1001).time, 1001);
  });
});
