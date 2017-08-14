import LayoutManager from './LayoutManager';

export const APP_ENV = 'dev'; // dev || production

export const $window = $(window);
export const $document = $(document);
export const $head = $('head');
export const $body = $('body');
export const $bodyContainer = $('#body-container');

// 반응형에 대응할 가로 길이
export const mobileWidth = 768;

// 디바이스가 모바일인지 확인
export const isMobile = (function(userAgent) {
		return /Android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent);
	})(navigator.userAgent);

// 안드로이드 단말기 인지 확인
export const isAndroid = (function(userAgent) {
		return /Android/i.test(userAgent);
	})(navigator.userAgent);

// IE8 브라우저인 확인
export const isIE8 = (function() {
	return ($('<canvas/>').get(0).getContext === undefined) ? true : false;
}());

// IE9 브라우저 확인
export const isIE9 = (function (navigator) {
	return (navigator.appName === 'Microsoft Internet Explorer' && /MSIE 9.0/i.test(navigator.userAgent)) ? true : false;
}(navigator));

// IE 브라우저 확인
export const isIE = (function(navigator) {
	if (navigator.appName === 'Microsoft Internet Explorer') {
		return true;
	} else if (/MSIE|Trident/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}(navigator));

// 파폭 체크
export const isFirefox = (function(userAgent) {
	return (/Firefox/i.test(userAgent)) ? true : false;
}(navigator.userAgent));

// 카톡 인앱 브라우저 확인
export const isKakaoInApp = (function(userAgent) {
	return (/KAKAOTALK/.test(userAgent)) ? true : false;
}(navigator.userAgent));

// 보여줄 뷰가 모바일 모드인지 확인. 디바이스 체크가 아닌 미디어쿼리 640을 기준으로 피씨 모드인가 확인
export const isMobileView =  () => {
	return new LayoutManager().screenWidth < mobileWidth ? true : false;
};

// 쿼리를 객체로 반환해줌.
export function getQueryToObj(queryString) {
	let arr, i, pair, queryObj = {};

	if (!queryString) {
		queryString = location.search;
	}
	arr = queryString.replace('?', '').split('&');

	for (i = 0; i < arr.length; i += 1) {
		pair = arr[i].split('=');
		queryObj[pair[0]] = pair[1];
	}

	return queryObj;
}

// 숫자에 콤마를 넣어 반환
export function changeUseComma(n) {
	let num = String(n),
		l = num.length,
		quotient = Math.floor(l / 3),
		string = '',
		rest = l % 3,
		i;
	if (!quotient) {
		return num;
	}
	for (i = 1; i <= quotient; i++) {
		string = ',' + num.substr(-3 * i, 3) + string;
	}
	if (rest) {
		string = num.substr(0, rest) + string;
	} else {
		string = string.substr(1);
	}
	return string;
}

/**
 * Convert Dashes to CamelCase
 * http://www.devcurry.com/2011/07/javascript-convert-camelcase-to-dashes.html
 */
export function dashToCamel(string) {
	return string ? string.replace(/\W+(.)/g, function (x, char) {
		return char.toUpperCase();
	}) : '';
}

/**
 * Convert CamelCase to Dashes
 * http://www.devcurry.com/2011/07/javascript-convert-camelcase-to-dashes.html
 */
export function camelToDash(string) {
	return string ? string.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase() : '';
}

/**
 * 개행 문자를 <br>태그로 변환함
 * @param  {String} string 변환할 텍스트
 */
export function nl2br(string){
	return string ? string.replace(/\n/g, '<br />') : '';
}

/**
 * 트윈으로 DOM요소에 적용되었던 CSS를 제거한다.
 *
 * @method clearCSS
 * @param {Object} jQuery 객체
 */
export function clearCSS($element) {
	$element.css({
		backfaceVisibility: '',
		clip: '',
		display: '',
		filter: '',
		left: '',
		opacity: '',
		position: '',
		top: '',
		transform: '',
		transformOrigin: '',
		transformStyle: '',
		'-webkit-filter': '',
		zIndex: ''
	});
	return $element;
}
