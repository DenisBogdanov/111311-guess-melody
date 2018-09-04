import {INITIAL_GAME} from './util/const';
import {changeScreen, render} from './util/screen-util';
import header from './component/game-header';
import gameGenreTemplate from './component/game-genre';
import gameArtistTemplate from './component/game-artist';
import gameConfirm from './component/game-confirm';
import welcome from './component/welcome';
import livesOver from './component/fail-lives-over';
import success from './component/success';
import getQuestions from "./data/tracks";
import {getScore, showResult} from "./util/game-util";

let gameState;

const resetGame = () => {
  gameState = Object.assign({}, INITIAL_GAME);
};

const play = () => {
  gameState = Object.assign({}, INITIAL_GAME);
  const questions = getQuestions(5);

  let headerElement = render(header(gameState));

  const updateGame = (state, gameTypeElement) => {
    headerElement = render(header(state));
    gameTypeElement.replaceChild(headerElement, gameTypeElement.firstElementChild);
    gameTypeElement.appendChild(gameConfirm);
  };

  let gameGenre = render(gameGenreTemplate(questions[gameState.level]));

  gameGenre.insertBefore(headerElement, gameGenre.firstElementChild);
  gameGenre.appendChild(gameConfirm);
  changeScreen(gameGenre);

  let gameArtist;

  const startGameGenre = () => {
    const uiReplayButton = gameGenre.querySelector(`.game__back`);
    const uiSubmitButton = gameGenre.querySelector(`.game__submit`);
    const uiForm = gameGenre.querySelector(`.game__tracks`);
    const uiAnswers = [...uiForm.elements.answer];
    const uiPlayButton = [...uiForm.querySelectorAll(`.track__button`)];
    const uiAudioElements = [...uiForm.querySelectorAll(`audio`)];

    uiReplayButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      gameConfirm.classList.remove(`modal--hidden`);
    });

    gameConfirm.querySelector(`#ok`).addEventListener(`click`, (event) => {
      event.preventDefault();
      resetGame();
      changeScreen(welcome);
      gameConfirm.classList.add(`modal--hidden`);
    });

    uiPlayButton[0].classList.add(`track__button--pause`);
    uiAudioElements[0].play();

    uiPlayButton.forEach((btn, index) => {
      btn.addEventListener(`click`, (event) => {
        event.preventDefault();
        if (btn.classList.contains(`track__button--pause`)) {
          btn.classList.remove(`track__button--pause`);
          uiAudioElements[index].pause();
        } else {
          for (let i = 0; i < uiPlayButton.length; i++) {
            uiPlayButton[i].classList.remove(`track__button--pause`);
            uiAudioElements[i].pause();
          }
          btn.classList.add(`track__button--pause`);
          uiAudioElements[index].play();
        }
      });
    });

    uiAnswers.forEach((elem) => elem.addEventListener(`change`, () => {
      uiSubmitButton.disabled = !uiAnswers.some((checkbox) => checkbox.checked);
    }));

    uiSubmitButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      const userAnswers = uiAnswers.filter((checkbox) => checkbox.checked);
      const isWrongAnswer = userAnswers.some((answer) => answer.value !== questions[gameState.level].answer);

      if (isWrongAnswer) {
        gameState.notes--;
        if (gameState.notes === 0) {
          changeScreen(livesOver);
          return;
        } else {
          gameState.answers.add({correct: false, time: 31});
          updateGame(gameState, gameGenre);
          uiForm.reset();
          uiSubmitButton.disabled = true;
        }
      } else {
        gameState.answers.add({result: true, time: 31});
      }

      gameArtist = render(gameArtistTemplate(questions[++gameState.level], gameState));
      gameArtist.insertBefore(headerElement, gameArtist.firstElementChild);
      gameArtist.appendChild(gameConfirm);
      changeScreen(gameArtist);
      startGameArtist();
      uiForm.reset();
      uiSubmitButton.disabled = true;
    });
  };

  startGameGenre();

  const startGameArtist = () => {
    const uiReplayButton = gameArtist.querySelector(`.game__back`);
    const uiForm = gameArtist.querySelector(`.game__artist`);
    const uiAnswers = [...uiForm.elements.answer];
    const uiPlayButton = gameArtist.querySelector(`.track__button`);
    const uiAudioElements = gameArtist.querySelector(`audio`);

    uiReplayButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      gameConfirm.classList.remove(`modal--hidden`);
    });

    gameConfirm.querySelector(`#ok`).addEventListener(`click`, (event) => {
      event.preventDefault();
      resetGame();
      changeScreen(welcome);
      gameConfirm.classList.add(`modal--hidden`);
    });

    uiPlayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      uiPlayButton.classList.toggle(`track__button--pause`);
      if (uiPlayButton.classList.contains(`track__button--pause`)) {
        uiAudioElements.play();
      } else {
        uiAudioElements.pause();
      }
    });

    for (const answer of uiAnswers) {
      answer.addEventListener(`click`, () => {
        if (answer.value !== questions[gameState.level].question.name) {
          gameState.notes--;
          if (gameState.notes === 0) {
            changeScreen(livesOver);
            return;
          } else {
            gameState.answers.add({correct: false, time: 31});
            updateGame(gameState, gameGenre);
            uiForm.reset();
          }
        } else {
          gameState.answers.add({result: true, time: 31});
        }

        if (questions[++gameState.level]) {
          gameGenre = render(gameGenreTemplate(questions[gameState.level], gameState));
          gameGenre.insertBefore(headerElement, gameGenre.firstElementChild);
          gameGenre.appendChild(gameConfirm);
          changeScreen(gameGenre);
          startGameGenre();
        } else {
          const resultUserGame = {
            score: getScore([...gameState.answers], gameState.notes),
            notes: gameState.notes,
            time: 100,
          };
          const resultTemplate = render(success(resultUserGame.score, showResult([], resultUserGame), gameState));
          resultTemplate.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
            event.preventDefault();
            resetGame();
            play();
          });

          changeScreen(resultTemplate);
        }
        uiForm.reset();
      });
    }
  };
};

export default play;
