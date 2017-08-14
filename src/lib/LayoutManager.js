import { EventEmitter } from 'events';

let instance = null;

class LayoutManager extends EventEmitter {
  // static get CHANGE() { // 클래스 외부, 하단에서 선언함
  //   return 'change';
  // }

  constructor(options) {
    super(); // 상속이 있을 경우, 싱글톤 구현시 인스턴스 반환보다 super()호출이 가장 먼저 와야 한다.
    if (instance) {
      return instance;
    }
    instance = this;

    this.options = Object.assign({breakpoint: 720}, options);
    this._screenWidth = 0;
    this._screenHeight = 0;
    this._orientation = '';
    this._isWide = null;
    this.$window = $(window)
      .on('load resize', this.update.bind(this))
      .on('orientationchange', this._onOrientationChange.bind(this));

    this.update();
  }

  get screenWidth() {
    return this._screenWidth;
  }

  get screenHeight() {
    return this._screenHeight;
  }

  get orientation() {
    return this._orientation;
  }

  get isWide() {
    return this._isWide;
  }

  _onOrientationChange(event) {
		this
      .update()
      .emit(LayoutManager.ORIENTATION_CHANGE, {
				screenWidth: this._screenWidth,
				screenHeight: this._screenHeight,
				orientation: this._orientation,
				isWide: this._isWide
			}, event);
	}

  update(event) {
    var enforceTrigger = event === true,
			newScreenWidth = this.$window.width(),
			newScreenHeight = this.$window.height();

		if (!enforceTrigger
      && this._screenWidth === newScreenWidth
      && this._screenHeight === newScreenHeight) {
			return this;
		}

		this._screenWidth = newScreenWidth;
		this._screenHeight = newScreenHeight;

		this._isWide = (this._screenWidth >= (parseInt(this.options.breakpoint, 10) || this._screenHeight));
		this._orientation = (this._screenWidth <= this._screenHeight)
      ? LayoutManager.PORTRAIT
      : LayoutManager.LANDSCAPE;

		this.emit(LayoutManager.CHANGE, {
			screenWidth: this._screenWidth,
			screenHeight: this._screenHeight,
			orientation: this._orientation,
			isWide: this._isWide
		}, enforceTrigger ? null : event);

		return this;
  }
}

LayoutManager.CHANGE = 'change';
LayoutManager.ORIENTATION_CHANGE = 'orientationchange';
LayoutManager.PORTRAIT = 'portrait';
LayoutManager.LANDSCAPE = 'landscape';

export default LayoutManager;
