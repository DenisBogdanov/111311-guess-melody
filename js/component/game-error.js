import {render} from '../util/screen-util';

const template = `
  <section class="modal">
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
  </section>
`;

const element = render(template);

export default element;