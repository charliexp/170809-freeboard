/**
 * --------------------------------------------------
 *
 * API Request
 *
 * --------------------------------------------------
 */

export default function ApiRequest(aipOptions) {
  if (!aipOptions) {
    return;
  }
  return $.ajax(mergeOptions(aipOptions));
}

function mergeOptions(obj) {
  return {
    url: obj.host + mergePathParameters(obj.PathParameters),
    dataType: obj.dataType || 'json',
    type: obj.type || 'GET',
    cache: obj.cache || true,
    data: obj.QueryParameters,
    jsonpCallback: obj.jsonpCallback || undefined,
    // success: (res) => {},
    // error: (xhr, status, err) => {}
  };
}

function mergePathParameters(params) {
  let str = '';
  for (let key in params) {
    str += '/' + params[key];
  }
  return str;
}





/**
 * --------------------------------------------------
 *
 * API List
 *
 * --------------------------------------------------
 */

export const API_KEY_OF_APIBOOK = '38d9b38a28c429ab059d7c0f39b2dac5795edcb7';

/**
 * 이미지 검색
 * guide: https://developers.daum.net/services/apis/search/image
 * api: https://apis.daum.net/search/image?apikey={apikey}&q=동갑내기 과외
 */
export const GET_BOOK_DATA = {
  localCache: false,
  host: 'https://apis.daum.net',
  PathParameters: {
    path: 'search/book',
  },
  QueryParameters: {
    apikey: API_KEY_OF_APIBOOK,
    q: ' 인문학',
    pageno: 1, // 1~3
    result: 20, // 1~20
    sort: 'popular', // popular : 판매량순, accu : 정확도순, date : 최신자료순
    output: 'json' // json, xml
  },
  dataType: 'jsonp',
  //jsonpCallback: 'video', // 함수를 지정해주면 window.video가 호출되면서 응답값이 전달된다. 생략시 jQuery에서 임의 생성한 콜백함수로 감싸서 값이 전달된다.
};

/**
 * 이미지 검색
 * guide: https://jsonplaceholder.typicode.com/
 * api: https://jsonplaceholder.typicode.com/posts/1
 */
export const GET_FAKE_DATA = {
  localCache: false,
  host: 'https://jsonplaceholder.typicode.com',
  PathParameters: {
    path: 'posts',
    postId: 1
  },
  QueryParameters: {},
  dataType: 'jsonp',
};

/**
 * 이미지 검색
 * guide: https://developers.daum.net/services/apis/search/image
 * api: https://apis.daum.net/search/image?apikey={apikey}&q=동갑내기 과외
 */
export const GET_IMAGE_DATA = {
  localCache: false,
  host: 'https://apis.daum.net',
  PathParameters: {
    search: 'search',
    image: 'image'
  },
  QueryParameters: {
    apikey: API_KEY_OF_APIBOOK,
    q: '로건',
    pageno: 1, // 1~3
    result: 10, // 1~20
    //advance: 'n', // 상세 검색, guide 참조
    sort: 'accu', // accu : 추천순, date : 날짜순
    output: 'json' // json, xml
  },
  dataType: 'jsonp'
};

/**
 * 임의의 서비스 데이터
 * api: http://chris.dev.daum.net/html5/es6/170620_react_test/src/lib/mock-indicator.json
 */
export const GET_INDICATOR_DATA = {
  localCache: true, // 쿼리를 변경하여 재 호출시 로컬에 저장된 데이터가 아닌 새 데이터를 불러오도록 한다. // 기본값 true, false면 계속 새롭게 호출됨.
  host: 'http://chris.dev.daum.net',
  PathParameters: {
    path: 'html5/es6/170620_react_test/src/lib/',
    file: 'mock-indicator.json'
  },
  QueryParameters: {
  },
  dataType: 'jsonp',
  jsonpCallback: 'indicatorCallback',
};

/**
 * 영화 콘텐츠
 * guide: https://developers.daum.net/services/apis/contents/movie
 * api: https://apis.daum.net/contents/movie?apikey={apikey}&q=동갑내기 과외
 */
export const GET_MOVIE_DATA = {
  localCache: false, // 쿼리를 변경하여 재 호출시 로컬에 저장된 데이터가 아닌 새 데이터를 불러오도록 한다.
  host: 'https://apis.daum.net',
  PathParameters: {
    contents: 'contents',
    movie: 'movie'
  },
  QueryParameters: {
    apikey: API_KEY_OF_APIBOOK,
    q: '로건',
    pageno: 1, // 1~500
    result: 10, // 1~20
    output: 'json' // json, xml
  },
  dataType: 'jsonp'
};

/**
 * 임의의 서비스 데이터
 * api: http://chris.dev.daum.net/html5/es6/170620_react_test/src/lib/mock-photo.json
 */
export const GET_PHOTO_DATA = {
  localCache: true,
  host: 'http://chris.dev.daum.net',
  PathParameters: {
    path: 'html5/es6/170620_react_test/src/lib/',
    file: 'mock-photo.json'
  },
  QueryParameters: {
  },
  dataType: 'jsonp',
  jsonpCallback: 'photoCallback',
};

/**
 * 비디오 콘텐츠
 * guide: https://developers.daum.net/services/apis/search/vclip
 * api: https://apis.daum.net/search/vclip?apikey={apikey}&q=동갑내기 과외
 */
export const GET_VIDEO_DATA = {
  localCache: true, // 쿼리를 변경하여 재 호출시 로컬에 저장된 데이터가 아닌 새 데이터를 불러오도록 한다. // 기본값 true, false면 계속 새롭게 호출됨.
  host: 'https://apis.daum.net',
  PathParameters: {
    search: 'search',
    vclip: 'vclip'
  },
  QueryParameters: {
    apikey: API_KEY_OF_APIBOOK,
    q: '로건',
    pageno: 1, // 1~3
    result: 20, // 1~20
    sort: 'accuracy', // accuracy: 정확도순, recency : 최신글순
    output: 'json' // json, xml
  },
  dataType: 'jsonp'
};

/**
* 게시판 쓰기
*/
export const WRITE_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/write',
  QueryParameters: {
    writer: '',
    title: '',
    content: '',
    password: ''
  },
  type: 'POST'
};

/**
* 게시판 읽기
*/
export const READ_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/read',
  PathParameters: {
    id: '',
    type: ''
  }
};

/**
* 게시판 수정권한 체크
*/
export const AUTH_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/auth',
  QueryParameters: {
    id: '',
    password: ''
  },
  type: 'POST'
};

/**
* 게시글 수정
*/
export const MODIFY_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/modify',
  PathParameters: {
    id: ''
  },
  QueryParameters: {
    writer: '',
    title: '',
    content: '',
    password: ''
  },
  type: 'PUT'
};

/**
* 게시글 삭제
*/
export const DELETE_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/delete',
  PathParameters: {
    id: ''
  },
  QueryParameters: {
    password: ''
  },
  type: 'DELETE'
};

/**
* 게시판 리스트
*/
export const LIST_BOARD = {
  localCache: false,
  host: 'http://localhost:3000/api/list',
  PathParameters: {
    page: '',
    perPage: ''
  }
};
