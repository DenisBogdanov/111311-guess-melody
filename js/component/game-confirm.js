import {render} from '../util/screen-util';

const template = `
<section class="modal modal--hidden">
  <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
  <h2 class="modal__title">Подтверждение</h2>
  <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
  <div class="modal__buttons">
    <button class="modal__button button" id="ok">Ок</button>
    <button class="modal__button button" id="cancel">Отмена</button>
  </div>
</section>`;

const element = render(template);

const closeModal = (event) => {
  event.preventDefault();
  element.firstElementChild.classList.add(`modal--hidden`);
};

element.querySelector(`#cancel`).addEventListener(`click`, closeModal);
element.querySelector(`.modal__close`).addEventListener(`click`, closeModal);

export default element;
