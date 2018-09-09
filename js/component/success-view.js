import AbstractView from '../abstract-view';

export default class SuccessView extends AbstractView {

  constructor(score, resultMessage, gameState) {
    super();
    this.score = score;
    this.resultMessage = resultMessage;
    this.game = gameState;
  }

  get template() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Вы настоящий меломан!</h2>
        <p class="result__total">За 3 минуты и 25 секунд вы набрали ${this.score} баллов (8 быстрых), совершив ${3 - this.game.notes} ошибки</p>
        <p class="result__text">${this.resultMessage}</p>
        <button class="result__replay" type="button">Сыграть ещё раз</button>
      </section>`;
  }

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.restart();
    });
  }

  restart() {
    //
  }
}
