# 170809-freeboard

## 개요
* 이 프로젝트에서는 node.js와 mongodb로 백앤드를 만들고 react로 프론트를 만들어 로그인 없이 사용 가능한 자유 게시판을 구현한다.
* `170522_react_webpack`을 가져와 사용함.
* 서버도 es6로 작업하여 webpack에서 한번에 띄워 작업하려 하였으나 실패함. [참고](https://velopert.com/1492)
* 따라서 서버는 es5로 작업하고 별도로 $ npm run dev-server 명령으로 서버를 3000포트에 실행
* 클라이언트는 es6와 리액트로 작업하고 $ npm run dev-client 명령으로 웹펙뎁서버 4000포트로 실행함
* 헤로쿠에 업로드시에는 $ npm run start 명령으로 실행. 이때 빌드된 인덱스 파일로 연결이 필요함. 이후 작업할 것

`webpack`을 사용하는 자바스크립트 프로젝트 빌드를 생성하는 과정을 정리하였다. 또한 이 레파지토리는 프로젝트 진행시 기본 스타트 팩으로 활용할 수 있도록 하려고 한다.  

es5에서는 grunt를 사용했었는데 es6환경에서는 실시간 수정된 파일 업데이트 등이 필요하여 webpack을 사용하게 되었다.
browserify는 사용법이 쉬우나 bundle된 파일을 띄우므로 디버깅이 어렵고, 수정후 모든 파일을 트랜스파일 후 머지하는 시간이 상당히 결러 불편하다.  

webpack은 webpack-dev-server를 함께 설치하여 사용하는데 이 dev-server는 수정된 파일만 업데이트 되어 속도가 빠르고 디버깅시에도 변환되기 전 즉 작업한 파일을 보여주어 수정이 용이하다. 그러나 설정은 상당히 어렵다.

## 수정사항
* React 프로젝트용으로 수정하였다.
* 기본 파일에 라우터, 리덕스, 비동기 액션등이 코딩되어 있다.
* react-hot-loader는 3로 업데이트 했다가 페이지 전체가 리로드되어 다시 1.3.1로 적용하였다. 한가지 알게 된 사실은 함수형 컴포넌트는 직접 페이지를 리로드 해주어야 한다. 그리고 로컬상의 state가 여전히 날아가는 문제가 있으나 해결 못하고 있다.

# ES6 환경 저장소 세팅 과정
## 1. Node.js와 git의 설치
* [Node.js](https://nodejs.org/en/)
* [git](https://git-scm.com/)  
* 설치 과정 생략함.
```
// 잘 설치 되었는지 버전 확인하기
$ node -v
$ git --version
```

## 2. 디렉토리 생성
```
$ mkdir 폴더명
$ cd 폴더명
```
* 직접 Finder(탐색기)에서 생성해도 된다.

## 3. 저장소 생성(git init)
* 저장소를 생성하여 GitHub과 연결해 주어야 한다. 두가지 방법이 있다. 여기서 잘못하면 여러번 폴더를 생성하거나 파일을 옮기는 등 애를 먹는다. 일단 이미 작업한 파일들이 있더라도 저장소 생성 후 폴더에 넣어주는 것이 좋다.

#### 1. 브라우저로 생성하는 방법
* [브라우저](https://github.com/chrisphotograph)로 깃헙에 접속하여 `New repository`로 생성
* 이때 `README.md`파일을 같이 생성해 줌
* 생성된 저장소에서 `Clone or download`클릭 후
* `Open in Desktop` 클릭하여 `GitHub Desktop`을 열어 로컬의 폴더로 연결해 준다.
* 노드 모듈을 설치할 것이므로 노드 모듈이 커밋되지 않도록 먼저 `.gitignore` 파일을 생성하여 커밋한다.
```
// .gitignore
node_modules
.DS_Store
```

#### 2. 터미널로 생성하는 방법
  * 생성된 디렉토리에서
  ```
  $ git init
  ```
  * `GitHub Desktop`을 열면 `Other`영역에 항목이 보임
  * `.gitignore` 생성하여 커밋

#### 3. `GitHub Desktop`을 사용하여 생성하는 방법
* 과정 생략

#### 4. `GitHub Desktop`에 로컬의 저장소 연결하기
* 폴더를 프로그램 창의 우측 목럭으로 드래그 하여준다.

## 4. npm init
* 노드 프로젝트를 시작하는 명령어.
* package.json 파일이 생성됨.  
* package.json은 프로젝트의 정보를 담고 있음.
```
$ npm init
```

## 5. 의존 모듈 설치
* 이제부터 필요한 모듈을 설치한다.
* 설치시 옵션
>--save: dependencies에 등록, 개발에 필요한 모듈 설치시  
--save-dev: devDependencies에 등록, 개발 환경에 필요한 모듈 설치시  

#### webpack 설치
```
$ npm install -g webpack webpack-dev-server
```
* webpack은 의존 모듈 문제로 로컬로도 설치해 주어야 한다.
```
$ npm install --save-dev webpack webpack-dev-server
```
* webpack: 브라우저 위에서 import(require)를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줌.
* webpack-dev-server: 별도의 서버를 구축하지 않고 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader를 통하여 코드가 수정 될 때마다 자동으로 리로드하여 줌. mamp를 안써도 됨.

#### 의존 모듈 설치  
```
// 트랜스 파일용(상황에 따라 다름)
$ npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
// 리액트 사용시
$ npm install --save react react-dom prop-types classnames
// 리덕스 사용시 추가
$ npm install --save redux react-redux redux-logger redux-thunk immutability-helper
// 리액트 라우터 사용시
$ npm install --save react-router-dom
// webpack dev서버 사용시나 빌드시
$ npm install --save-dev extract-text-webpack-plugin file-loader html-webpack-plugin react-hot-loader
$ npm install --save-dev css-loader style-loader
// 기타 모듈
$ npm install --save jquery

```

* 혹 오류가 나면 다시 설치하면 된다. 때로는 모듈관 의존 관계로 순서를 바꾸어 설치해야 할때도 있다.
* babel-preset-stage-0은 최신 자바스크립트 문법 사용 가능하게 함.
* babel은 es6 문법을 프로젝트에서 사용할 수 있게 하여줌.  
* babel-preset-react는 리액트 코드인 jsx도 인식할 수 있도록 하여줌.  
* react-hot-loader는 리액트 컴포넌트 변경시 해당 컴포넌트만 업데이트 되도록 하여줌.  개발 서버가 기본적으로 리액트를 호환하지 않기때문.  이 모듈이 없으면 계속 새로고침 하여야 함.  이 모듈이 없어도 페이지 리로드 하지 않고 부분만 리로드 하도록 할 수 있으나 리액트는 로컬상의 state데이터가 날아가는 문제가 있어 이 모듈을 필요로 함.  
리액트가 아닌 화경이라면 index.js파일에서  
`if (module.hot) {
  module.hot.accept();
}`
을 넣어주면 됨.  
* webpack은 글로벌로 설치했지만 여기 모듈들이 의존하기 때문에 로컬로도 설치해야 함.  

## 6. webpack 설정하기
* webpack.config.js 파일을 만들어 사용한다. Webpack 실행시 이 config 모듈을 불러와 설정파일로 사용한다.
* webpack.config.prod.js를 하나 더 새성하여 배포본 생성시 사용하도록 한다.
* 상세한 내용은 프로젝트 디렉토리의 webpack.config 파일의 주석 참조.

## 7. JSHint ESLint
#### JSHint 사용시 루트 폴더에 `.jshintrc`설정
```
{
	"esversion": 6
}
```

#### ESLint 사용시 루트 폴더에 `.eslintrc`설정
```
$ npm install --save-dev eslint eslint-loader eslint-plugin-react
```
* eslint-loader는 webpack으로 빌드시에 js파일들을 검사
* eslint-plugin-react은 react를 사용시 eslint가 작동되도록 함.

## 8. HTML 및 JS 작성
/public/index.html
```
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>React App</title>
   </head>
   <body>
      <div id="root"></div>
   </body>
</html>
```

* js파일은 자동으로 주입되도록 설정되어 있다. 따라서 코드에는 `bundle.js`가 들어가 있지 않다.
* /src 안에 js 파일들 작성  
* /src/index.js가 엔트리 파일임.
* css는 js에서 import로 사용한다. 개발시에는 js파일 안에 css가 들어가고, 빌드에서는 별도 파일로 분리된다.

## 9. 스크립트 파일 만들기
`package.json`의 `scripts` 부분에 `dev-server`와 `build` 추가
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev-server": "webpack-dev-server",
  "build": "webpack --config webpack.config.prod.js"
}
```
이 실행 스크립트는 아래의 명령어로 실행
```
$ npm run dev-server
$ npm run build
```
해당 개발서버의 포트에서 실행된 파일 확인한다.
```
localhost:4000
```
원래 webpack에서 빌드는 아래 명령어로 실행하나 여기선 설정을 적용하였기에 위 명령어로 빌드한다.
```
$ webpack
```
