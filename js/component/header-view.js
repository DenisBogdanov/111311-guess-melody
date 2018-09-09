import AbstractView from '../abstract-view';

export default class HeaderView extends AbstractView {

  constructor(gameState) {
    super();
    this.gameState = gameState;
    this.minutes = `0` + Math.floor(gameState.time / 60);
    this.seconds = gameState.time % 60 < 10 ? `0` + (gameState.time % 60) : gameState.time % 60;
  }

  get template() {
    return `
      <header class="game__header">
        <a class="game__back" href="#">
          <span class="visually-hidden">Сыграть ещё раз</span>
          <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
        </a>
  
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle class="timer__line" cx="390" cy="390" r="370" 
                  style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
        </svg>
  
        <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer__mins">${this.minutes}</span>
          <span class="timer__dots">:</span>
          <span class="timer__secs">${this.seconds}</span>
        </div>
  
        <div class="game__mistakes">
          ${new Array(3 - this.gameState.notes).fill(`<div class="wrong"></div>`).join(``)}
        </div>
      </header>`;
  }

  bind() {
    const uiReplayButton = this.element.querySelector(`.game__back`);
    uiReplayButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.restart();
    });
  }

  restart() {
    //
  }
}
