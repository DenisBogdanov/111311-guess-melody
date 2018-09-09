import AbstractView from '../abstract-view';

export default class TimeOverView extends AbstractView {

  constructor() {
    super();
  }

  get element() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Увы и ах!</h2>
        <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
        <button class="result__replay" type="button">Попробовать ещё раз</button>
      </section>`;
  }

  bind() {
    this.element.querySelector(`.result_replay`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.restart();
    });
  }

  restart() {
    //
  }

}
