import {render} from './util/screen-util';

export default class AbstractView {

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate abstract class AbstractView`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return render(this.template);
  }

  bind(element) {
    // bind handlers if required
    throw new Error(`Override method, using ${element}`);
  }
}
