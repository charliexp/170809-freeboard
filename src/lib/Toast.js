import * as utils from './utils';
import 'css/toast.css';

let instance;

class Toast {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.isToasting = false;
    this.toast = $('<div id="toast" />');
    utils.$body.append(this.toast);
  }

  on(msg, time) {
    if (this.isToasting) {
      return;
    }

    this.isToasting = true;

    this.toast
      .text(msg)
      .addClass('show')
      .addClass('on');

    setTimeout(() => {
      this.toast
        .removeClass('on')
        .addClass('off');

      setTimeout(() => {
        this.toast
          .removeClass('show off');
        this.isToasting = false;
      }, 300);
    }, time);
  }
}

export default Toast;
