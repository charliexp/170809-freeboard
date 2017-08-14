import $ from 'jquery'; // https://www.npmjs.com/package/jquery
import swipe from 'jquery-touchswipe'; // https://www.npmjs.com/package/jquery-touchswipe
import { TweenLite, Power3 } from 'gsap'; // https://www.npmjs.com/package/gsap

class SwipeContentByJqueryTouchswipe {
  constructor($element) {
    // swipe가 import된 후 사용 안되는 문제를 회피, 의미는 없는 코드인듯.
    swipe;

    // elements
    this.$element = $element;
    this.$container = $('.container', this.$element);
    this.$wrap = $('.wrap', this.$element);
    this.$item = $('.item', this.$element);
    this.$dots = $('li', this.$element);

    // vars
    this.imgIndex = 0;
    this.imgLength = this.$item.length;
    this.imgWidth = this.$item.width();
    this.$wrap.css('width', this.imgLength * this.$container.width());
    this.isMove = false;  // end나 cancel이 두번씩 호출되어 끝나는 이벤트가 한번만 발생하도록 변수로 체크
  }

  init() {
    this._initSwipe();
    this._setDotNavi();
    return this;
  }

  resize() { // 모바일모드, 피씨모드 변경 등으로 사이즈 조절이 발생시 호출하여 사이즈를 다시 세팅해 준다.
    this.imgWidth = this.$item.width();
    this.$wrap.css('width', this.imgLength * this.$container.width());
    TweenLite.set(this.$wrap, {
      x: -this.imgWidth * this._getIndex()
    });
  }

  _initSwipe() {
    this.$container.swipe({
      swipeStatus: (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) => {
        if (phase === 'start') {
          this.isMove = true;
        } else if (phase === 'move') {
          this._handleMoveSwipe(direction, distance);
        } else if (phase === 'end' || phase === 'cancel') { // cancel이 두번 호출됨 ㅠ
          this._handleEndSwipe(direction, distance);
          this._setDotNavi();
        }
      },
      triggerOnTouchLeave: true
    });
    this.$dots.on('click', e => {
      let idx = this.$dots.index(e.target);
      this._handleClickDotNavi(idx);
    });
  }

  _setIndex(idx) {
    if (idx >= this.imgLength) {
      this.imgIndex = this.imgLength - 1;
    } else if (idx < 0) {
      this.imgIndex = 0;
    } else {
      this.imgIndex = idx;
    }
  }

  _getIndex() {
    return this.imgIndex;
  }

  _handleMoveSwipe(direction, distance) {
    if (direction === 'left') {
      TweenLite.set(this.$wrap, {
        x: -distance - this.imgWidth * this._getIndex()
      });
    } else if (direction === 'right') {
      TweenLite.set(this.$wrap, {
        x: distance - this.imgWidth * this._getIndex()
      });
    }
  }

  _handleEndSwipe(direction, distance) {
    if (this.isMove) {
      this.isMove = false;
    } else {
      return;
    }
    if (distance > 60) {
      if (direction === 'left') {
        this._setIndex(this._getIndex() + 1);
      } else if (direction === 'right') {
        this._setIndex(this._getIndex() - 1);
      }
    }
    TweenLite.to(this.$wrap, 0.3, {
      x: -this.imgWidth * this._getIndex(),
      ease: Power3.easeOut
    });
  }

  _setDotNavi() {
    this.$dots.eq(this._getIndex()).addClass('on').siblings().removeClass('on');
  }

  _handleClickDotNavi(idx) {
    this._setIndex(idx);
    TweenLite.to(this.$wrap, 0.3, {
      x: -this.imgWidth * this._getIndex(),
      ease: Power3.easeOut
    });
    this._setDotNavi();
  }

  destroy() {
    this.$container.swipe('destroy');
  }

  disable() {
    this.$container.swipe('disable');
  }

  enable() {
    this.$container.swipe('enable');
  }

}

export default SwipeContentByJqueryTouchswipe;
