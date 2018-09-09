import AbstractView from '../abstract-view';

export default class ArtistView extends AbstractView {

  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
      <section class="game game--artist">    
        <section class="game__screen">
          <h2 class="game__title">${this.question.question}</h2>
          <div class="game__track">
            <button class="track__button track__button--play" type="button"></button>
            <audio src="${this.question.answer.src}"></audio>
          </div>
    
          <form class="game__artist">
            ${this.question.options.map((option, index) => `
              <div class="artist">
                <input class="artist__input visually-hidden" type="radio" name="answer" value="${option.name}" id="answer-${index}">
                <label class="artist__name" for="answer-${index}">
                  <img class="artist__picture" src="${option.image}" alt="${option.artist}">
                  ${option.artist}
                </label>
              </div>
            `.trim()).join(``)}
                    
          </form>
        </section>
      </section>`;
  }

  bind() {
    const uiForm = this.element.querySelector(`.game__artist`);
    const uiAnswers = [...uiForm.elements.answer];
    const uiPlayButton = this.element.querySelector(`.track__button`);
    const uiAudioElements = this.element.querySelector(`audio`);

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
      answer.addEventListener(`click`, (event) => {
        event.preventDefault();
        this.checkAnswer(answer);
        uiForm.reset();
      });
    }
  }

  checkAnswer(answer) {
    throw new Error(`Override method, using ${answer}`);
  }

}

