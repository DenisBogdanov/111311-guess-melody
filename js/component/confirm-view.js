import AbstractView from '../abstract-view';

export default class ConfirmView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal modal--hidden">
        <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__buttons">
          <button class="modal__button button" id="ok">Ок</button>
          <button class="modal__button button" id="cancel">Отмена</button>
        </div>
      </section>`;
  }

  bind() {
    const uiCloseButton = this.element.querySelector(`.modal__close`);
    const uiCancelButton = this.element.querySelector(`#cancel`);
    const uiConfirmButton = this.element.querySelector(`#ok`);

    const cancel = (event) => {
      event.preventDefault();
      this.onCancel();
    };

    uiCloseButton.addEventListener(`click`, cancel);
    uiCancelButton.addEventListener(`click`, cancel);
    uiConfirmButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onConfirm();
    });
  }

  onCancel() {
  }

  onConfirm() {
  }
}
