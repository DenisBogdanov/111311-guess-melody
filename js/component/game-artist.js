const template = (question) => {
  return `
  <section class="game game--artist">    
    <section class="game__screen">
      <h2 class="game__title">${question.question}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${question.answer.src}"></audio>
      </div>

      <form class="game__artist">
        ${question.options.map((option, index) => `
          <div class="artist">
            <input class="artist__input visually-hidden" type="radio" name="answer" value="${option.name}" id="answer-${index}">
            <label class="artist__name" for="answer-${index}">
              <img class="artist__picture" src="${option.image}" alt="${option.name}">
              ${option.name}
            </label>
          </div>
        `.trim()).join(``)}
                
      </form>
    </section>
  </section>
`;
};

export default template;
