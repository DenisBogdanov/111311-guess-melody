import AbstractView from '../abstract-view';

export default class ErrorView extends AbstractView {

  constructor() {
    super();
  }

  get element() {
    return `
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
      </section>`;
  }

  bind() {
    //
  }
}
