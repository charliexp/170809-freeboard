// webpack-dev-server에서 제공하는 hot 기능(수정된 모듈만 컴파일하여 페이지 새로고침)을 사용시
// 페이지가 리로딩 되는데 아래 코드 추가하면 수정된 부분만 부분적으로 로딩된다.
// 그러나 리액트에서는 로컬의 state가 날아가므로 아래 코드를 지우고 react-hot-loader를 사용해야 한다.
// if (module.hot) {
//   module.hot.accept();
// }

import React from 'react';
import ReactDOM from 'react-dom';

// 구형 브라우저 지원(https://babeljs.io/docs/usage/polyfill/)
import 'babel-polyfill';

// 구형 브라우저 지원(https://velopert.com/2597)
import Promise from 'promise-polyfill';

// 원래 import App from './container/App';인데 웹펙의 'src'경로 설정으로 바로 'container'로 호출할 수 있음.
import { App } from 'containers';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
