import {INITIAL_GAME} from './util/const';
import {changeScreen} from './util/screen-util';
import SuccessView from './component/success-view';
import getQuestions from "./data/tracks";
import {getScore, showResult} from "./util/game-util";
import WelcomeView from "./component/welcome-view";
import NotesOverView from "./component/notes-over-view";
import HeaderView from "./component/header-view";
import ConfirmView from "./component/confirm-view";
import GenreView from "./component/genre-view";
import ArtistView from "./component/artist-view";

const QUESTIONS = getQuestions(5);

let gameState = Object.assign({}, INITIAL_GAME);

const resetGame = () => {
  gameState = Object.assign({}, INITIAL_GAME);
};

const welcomeView = new WelcomeView();
welcomeView.play = () => {
  play();
};

const notesOverView = new NotesOverView();
notesOverView.replay = () => {
  play();
};

const confirmView = new ConfirmView();
confirmView.onCancel = () => {
  confirmView.element.classList.add(`modal--hidden`);
};
confirmView.onConfirm = () => {
  confirmView.element.classList.add(`modal--hidden`);
  resetGame();
  changeScreen(welcomeView.element);
};

const updateGame = (state, gameType) => {
  const headerView = new HeaderView(state);
  headerView.restart = () => {
    confirmView.element.classList.remove(`modal--hidden`);
  };

  gameType.element.insertBefore(headerView.element, gameType.element.firstElementChild);
  gameType.element.appendChild(confirmView.element);
  changeScreen(gameType.element);
};

const gameGenre = (question) => {
  const genreView = new GenreView(question);

  genreView.checkAnswer = (uiAnswers) => {
    const userAnswers = uiAnswers.filter((checkbox) => checkbox.checked);
    const isWrongAnswer = userAnswers.some((answer) => answer.value !== question.answer);

    if (isWrongAnswer) {
      gameState.notes--;
      if (gameState.notes === 0) {
        changeScreen(notesOverView.element);
        return;
      } else {
        gameState.answers.add({correct: false, time: 31});
        updateGame(gameState, genreView);
      }
    } else {
      gameState.answers.add({correct: true, time: 31});
    }

    updateGame(gameState, gameArtist(QUESTIONS[++gameState.level]));
  };

  return genreView;
};

const gameArtist = (question) => {
  const artistView = new ArtistView(question);

  artistView.checkAnswer = (answer) => {
    if (answer.value !== QUESTIONS[gameState.level].answer.artist) {
      gameState.notes--;
      if (gameState.notes === 0) {
        changeScreen(notesOverView.element);
        return;
      } else {
        gameState.answers.add({correct: false, time: 31});
        updateGame(gameState, artistView);
      }
    } else {
      gameState.answers.add({correct: true, time: 31});
    }

    if (QUESTIONS[++gameState.level]) {
      updateGame(gameState, gameGenre(QUESTIONS[gameState.level]));
    } else {
      const result = {
        score: getScore([...gameState.answers], gameState.notes),
        notes: gameState.notes,
        time: 100,
      };

      const successView = new SuccessView(result.score, showResult([], result), gameState);

      successView.restart = () => {
        resetGame();
        play();
      };

      changeScreen(successView.element);
    }
  };

  return artistView;
};

const play = () => {
  resetGame();
  updateGame(gameState, gameGenre(QUESTIONS[gameState.level]));
};

export default play;
