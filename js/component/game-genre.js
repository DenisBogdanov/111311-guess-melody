const template = (question) => {
  return `
  <section class="game game--genre">

    <section class="game__screen">
      <h2 class="game__title">${question.question}</h2>
      <form class="game__tracks">
           ${question.options.map((option, index) => `
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
    </section>
`;
};

export default template;
