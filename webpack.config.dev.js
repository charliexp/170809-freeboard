// 이것은 node.js파일이고 es5 구문이다. es6에서는 import문을 사용한다.
var webpack = require('webpack');

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

// 이 객체를 module로 내보냄, 다른 코드에서 require('module')로 불러올 수 있다.
// 나중 Webpack 실행시 이 config 모듈을 불러와 설정파일로 사용함.
module.exports = {

  // webpack은 require를 통해 호출되는 파일들을 합쳐 하나로 만들어 줌. 그 시작 파일. 배열로 여러 파일을 전달할 수 도 있음.
  entry: [
    'babel-polyfill', // ie8 대응
    './src/index.js',
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',

    // 리액트 브라우저 라우터 사용시 주소창에 하위 라우터 직접 들어오면 자동 생성 번들 파일이 잘못된 경로를 참조하는 문제 발생. 아래 퍼블릭 패스 추가로 해결함.
    publicPath: '/' // 참고: https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
  },
  // 합친 파일들을 'public'폴더에 'bundle.js'로 저장함

  devServer: { // 개발 서버의 설정
    hot: true, // 파일이 수정 될 때마다 리로드 함
    inline: true, // hot reload에서 필요한 webpack dev server의 클라이언트를 번들에 같이 넣어주는 것
    host: '0.0.0.0', // server를 listen할 주소, 기본 값은 localhost, 호스팅된 곳으로 접속시 '0.0.0.0'을 추가해 줌´
    port: 4000, // 개발 서버의 포트
    contentBase: __dirname + '/public/', // index 파일의 위치
    historyApiFallback: true, // 리액트 브라우저 라우터 사용시에는 내부 이동이 아닌 페이지 리로드시 서버로 요청되는 문제 발생.
  },

  module: {
    rules: [
      { // loader를 통하여 es6, react를 일반 javascript로 변환해줌.
        // 여기에 다른 로더를 사용하면 css도 require해서 사용할 수 있고 html도 압축할 수 있음
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react']
        })],
        // react-hot-loader사용시 babel-loader보다 먼저 와야 한다. 그리고 babel에 전달되는 query는 react-hot-loader로 인하여 json으로 전달한다.
        // 관련 동영상 참조: https://www.inflearn.com/course-status-2/ 섹션 3-3
        // stage-0은 babel-preset-stage-0을 스크립트에 사용하기 위함이다. 이것은 최신 문법(스프레드 연산자 등)을 사용 가능하게 해준다.
        // presets은 해당 코드를 변환한다는 의미이다.
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        // 이 코드로 빌드하면 css파일이 js파일안에 들어간다. 즉 별도의 css 파일이 없다.
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['url-loader?limit=5000']
      },
    ]
  },

  resolve: {
    modules: [
      //React 프로젝트의 루트디렉토리를 설정하여, 나중에 ./components 혹은 ../components 이렇게 접근해야 되는
      // 디렉토리를 바로 components 로 접근 할 수 있게 해줍니다.
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),

    new webpack.HotModuleReplacementPlugin(),
    // webpack-dev-server의 플러그인. 수정된 파일만 로딩을 함.
    // 자동으로 리로드해주는 hot loading reload도 플러그인을 통해서 하는 것임.
    // 플러그인은 js파일을 압축하는 uglify등 여러 플러그인이 있음



    // html안에 js삽입코드가 없어도 여기서 넣어준다.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ],

  devtool: '#inline-source-map'
  // 개발자 도구 연동으로 디버깅시 컴파일된 코드가 아닌 작성한 코드로 볼 수 있다.
};
