import AbstractView from '../abstract-view';

export default class GenreView extends AbstractView {

  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
      <section class="game game--genre">

        <section class="game__screen">
          <h2 class="game__title">${this.question.question}</h2>
          <form class="game__tracks">
          ${this.question.options.map((option, index) => `
             <div class="track">
               <button class="track__button track__button--play" type="button"></button>
               <div class="track__status">
                 <audio src="${option.src}"></audio>
              </div>
              <div class="game__answer">
              <input class="game__input visually-hidden" type="checkbox" name="answer" value="${option.genre}" id="answer-${index}">
              <label class="game__check" for="answer-${index}">Отметить</label>
              </div>
            </div>`.trim()).join(``)}
      
            <button class="game__submit button" type="submit" disabled>Ответить</button>
          </form>
        </section>
      </section>`;
  }

  bind() {
    const uiSubmitButton = this.element.querySelector(`.game__submit`);
    const uiForm = this.element.querySelector(`.game__tracks`);
    const uiAnswers = [...uiForm.elements.answer];
    const uiPlayButtons = [...uiForm.querySelectorAll(`.track__button`)];
    const uiAudioElements = [...uiForm.querySelectorAll(`audio`)];
    uiPlayButtons[0].classList.add(`track__button--pause`);
    uiAudioElements[0].play();

    uiPlayButtons.forEach((btn, index) => {
      btn.addEventListener(`click`, (event) => {
        event.preventDefault();
        if (btn.classList.contains(`track__button--pause`)) {
          btn.classList.remove(`track__button--pause`);
          uiAudioElements[index].pause();
        } else {
          for (let i = 0; i < uiPlayButtons.length; i++) {
            uiPlayButtons[i].classList.remove(`track__button--pause`);
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
      this.checkAnswer(uiAnswers);
      uiForm.reset();
      uiSubmitButton.disabled = true;
    });
  }

  checkAnswer(uiAnswers) {
    throw new Error(`Override method, using ${uiAnswers}`);
  }
}
