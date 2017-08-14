import * as utils from './utils';

const playerCallback = {
  notReadyCallback: function () {
      console.info('영상 재생 준비중입니다.');
      console.info('notReadyCallback event : Player가 아직 영상재생 준비중입니다.')
  },
  onStartLoadVideo: function (vid, type, linkId) {
      console.info('영상시작');
      console.info('onStartLoadVideo event : Player가 영상의 리소를 로드하기 시작했습니다. \n' +
          ' ( vid: ' + vid + ', type: ' + type + ' linkId: ' + linkId + ' )');
  },
  onReadyComplete: function () {
      console.info('iframe 삽입완료');
      console.info('onReadyComplete event : Iframe Player를 사용할 준비가 완료되었습니다.');
  },
  onReadyVideo: function () {
      console.info('영상재생 준비 완료');
      console.info('onReadyVideo event : 영상재생 준비가 완료되었습니다.');
  },
  onLoadedContentVideo: function () {
      console.info('본영상 로드 완료');
      console.info('onLoadedContentVideo event : 본(콘텐트) 영상재생 준비가 완료되었습니다.');
  },
  onPlayStart: function () {
      console.info('영상재생 시작');
      console.info('onPlayStart event : 영상재생이 시작되었습니다.');
  },
  onPlayInlineStart: function () {
      console.info('영상재생 시작)폐기예정인 이벤트입니다.)');
      console.info('onPlayInlineStart event : 영상재생이 시작되었습니다.(폐기예정인 이벤트입니다.)');
  },
  onPlayEnd: function () {
      console.info('영상재생 완료');
      console.info('onPlayEnd event : 영상재생이 완료되었습니다.');
  },
  onPlayError: function (name, desc) {
      console.info('에러발생');
      console.info('onPlayError event : 에러가 발생하였습니다.' +
          ' ( name: ' + name + ', desc: ' + desc + ' )');
  },
  onPlayCancel: function () {
      console.info('재생취소');
      console.info('onPlayCancel event : 재생취소되었습니다..');
  },
  onMeasureHeight: function (height, width) {
      console.info('영상사이즈 리턴');
      console.info('onMeasureHeight event : 영상 사이즈 정보입니다. height: ' + height + ', width: ' + width);
  },
  onVideoStateChange: function (state, id, linkid) {
      console.info('영상 상태변경', state, id, linkid);
      console.info('onVideoStateChange event : 영상재생 상태가 변경되었습니다. ' + state + ', id: ' + id + ', linkid: ' + linkid);
  },
  onFullScreenChange: function (state) {
      console.info('전체화면', state);
      console.info('onFullScreenChange event : 전체화면 모드가 변경되었습니다. ' + ', isFullScreen state: ' + state);
  },
  onTouchEventStart: function () {
      console.info('프로그레스 포인트의 터치(마우스다운)이벤트 발생시 탐색시작');
      console.info('onTouchEventStart event : 프로그레스 포인트의 터치(마우스다운)이벤트가 발생하였습니다.');
  },
  onAddPlaylist: function (clipId) {
      console.info('onAddPlaylist event: 플레이리스트에 담기', clipId);
      console.info('onAddPlaylist event : 플레이리스트에 담기를 요청합니다. ' + clipId);
  },
  onWideScreenChange: function () {
      console.info('onWideScreenChange event: 와이드화면으로 변경');
      console.info('onWideScreenChange event : 플레이어를 와이드화면으로 변경하였습니다.');
  },
  onCheckNextVideo: function (clipLinkId) {
      console.info('onCheckNextVideo event: 영상종료 5초전 다음영상 체크', clipLinkId);
      console.info('onCheckNextVideo event : 영상종료 5초전에 자동재생할 다음영상이 존재하는지 체크합니다. ' + clipLinkId);
  },
  onEndAutoPlayTimer: function () {
      console.info('onEndAutoPlayTimer event: 영상종료 5초 타이머 종료');
      console.info('onEndAutoPlayTimer event : 영상종료 5초 타이머 종료.');
  },
  onChangeAutoPlayMode: function (isAutoPlay) {
      console.info('onChangeAutoPlayMode event: 자동재생모드 설정', isAutoPlay);
      console.info('onCheckNextVideo event : 자동재생모드 설정이 변경되었습니다. ' + isAutoPlay);
  },
  canUseApi: function () {
      console.info('api 사용가능');
      console.info('canUseApi event : api 사용가능');
  }
};

/**
 * play, stop 등 메소드가 존재하나 작동하지 않는다. 이것은 ifame으로 삽입시에는 제어가 안되는 듯하다.
 * 그냥 autoplay 등 옵션으로 제어한다.
 * guide: https://kakao.agit.in/g/300004717/wall/308087572#comment_panel_308096805
 * wiki: http://wiki.daumkakao.com/pages/viewpage.action?pageId=384074802
 * demo: http://tv.kakao.com/embed/player/demo/
 * code: https://kakaotv.daum.net/player/script/sdk/player_api.js
 */

class KakaoTvPlayer {
  constructor($container, videoId, options) {
    this.$container = $container;
    this._videoId = videoId;
    this.config = {
				autoplay: 0, // 영상 자동 재생
				branding: null,
				controls: null,
				coverurl: null,
				extensions: null,
				fs: null,
        host: '', // stage, dev 호스트로 삽입하고 싶을때 사용 (ex: 'http://stage.videofarm.daum.net')
				id: null,
				internalParam: null,
				isLauncher: null,
				kakaotv: false, // true일 경우 카카오TV 플레이어로 삽입
				local: false, // true인 경우 로컬 iframe 삽입, 개발토스트 표시
				playsinline: null,
				profile: 'MAIN', // iframe 임베딩 시 디폴트로 재생할 영상의 profile명 (LOW | BASE | MAIN | HIGH)
				rel: null,
				section: null,
				service: null,
				showcover: 1, // false인 경우 영상재생 시작시 나오는 video element를 제외한 모든 요소를 숨김 (custom view 사용) 구)coverVisibility: true
				showinfo: null,
        start: 0, // 영상 시작할 위치, 구)startDuration: 0
				type: 'VOD',
				useInline: true // 안드로이드, 아이패드에서 인라인 재생 지원

				//isAllowHdWebPlay: false,	// true인 경우 HD 재생가능 (웹투앱 사용 안함)
				//https: false, 			// true일 경우 https로 삽입
				//use3g4gAlert: true, 		// 3g4g 과금 알림 alert 동작 여부 (한번 메세지 뜨면 쿠키로 12시간이내에는 다시 보여주지 않음)
				//useHdAlert: true, 		// HD재생 웹투앱시 알림 alert 동작 여부
			};
    this.options = options;
    if (KakaoTvPlayer.scriptLoaded) { // 스크립트 한번만 로딩, 계속 인스턴스가 생성되므로 공용으로 사용하기 위해 클래스 스태틱 변수로 작성함.
      this.initPlayer();
    } else {
      this.loadScript();
    }
  }

  loadScript() {
    $.getScript('http://tv.kakao.com/player/script/sdk/player_api.js')
      .done((script, textStatus) => {
        KakaoTvPlayer.scriptLoaded = true;
        this.initPlayer();
      })
      .fail((jqxhr, settings, exception) => {});
  }

  initPlayer() {
    // 모바일에서는 인터렉션 없이 api로 play등 사용시 작동하지 않아
    // document.domain을 설정하여 postMessage대신 iframe으로 접근하여 제어하도록 한다.
    // 플레이어 가이드.pdf 참조

    // try {
		// 	if (document.domain !== KakaoTvPlayer.DOCUMENT_DOMAIN) {
		// 		document.domain = KakaoTvPlayer.DOCUMENT_DOMAIN;
		// 	}
		// } catch (e) {
    //   //
		// }

    // 모바일에서는 오토 플레이가 허락된 웹뷰에서만 가능하므로 값을 넣어주면 안되고 분기를 태워서 작업해야 함.
    let _autoplay;
    if (utils.isMobile) { // mobile
      if (this.options.autoplay === 1 || this.options.autoplay === 0) { // 전달받은 값 있을 때
        if (this.options.autoplay === 1) {
          _autoplay = utils.isKakaoInApp ? 1 : 0;
        } else {
          _autoplay = 0;
        }
      } else { // 전달받은 값 없을 때
        if (this.config.autoplay === 1) {
          _autoplay = utils.isKakaoInApp ? 1 : 0;
        } else {
          _autoplay = 0;
        }
      }
    } else { // pc
      if (this.options.autoplay === 1 || this.options.autoplay === 0) { // 전달받은 값 있을 때
        _autoplay = this.options.autoplay;
      } else { // 전달받은 값 없을 때
        _autoplay = this.config.autoplay;
      }
    }
    
    this._payer = window.KTP && window.KTP.Player.create(
      this.$container.get(0),
      Object.assign(this.config, {
				autoplay: _autoplay,
				id: this._videoId,
				profile: this.options.profile,
				service: KakaoTvPlayer.SERVICE_NAME
      })//, playerCallback
    );
  }

  getDuration() {
    if (this._payer) {
      return this._payer.getDuration();
    }
    return this;
  }

  load(id, profile, start) {
    if (this._payer) {
      this._payer.load(id);
    }
    return this;
  }

  loadAndPlay(id, profile, start) {
    if (this._payer) {
      this._payer.loadAndPlay(id);
    }
    return this;
  }

  mute() {
    if (this._payer) {
      this._payer.mute();
    }
    return this;
  }

  pause() {
    if (this._payer) {
      this._payer.pause();
    }
    return this;
  }

  play(profile) {
		if (this._payer) {
			this._payer.play(profile);
		}
		return this;
	}

  seekTo(ms) {
    if (this._payer) {
      this._payer.seekTo(ms);
    }
    return this;
  }

  setVolume(number) {
    if (this._payer) {
      this._payer.setVolume(number);
    }
    return this;
  }

  stop() {
    if (this._payer) {
      this._payer.stop();
    }
    return this;
  }

  upMute() {
    if (this._payer) {
      this._payer.upMute();
    }
    return this;
  }

}

KakaoTvPlayer.DOCUMENT_DOMAIN = 'daum.net';
KakaoTvPlayer.SERVICE_NAME = 'kakao_tv';
KakaoTvPlayer.scriptLoaded = false;

export default KakaoTvPlayer;
