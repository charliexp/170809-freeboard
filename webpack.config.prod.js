/* global require, module, __dirname */
// 위 주석문은 jshint 사용시 필요한 구문이다.

// 이것은 node.js파일이고 es5 구문이다. es6에서는 import문을 사용한다.
// $ npm install --save-dev webpack webpack-dev-server
// 설치된 webpack에서 이 파일을 설정파일로 사용한다.
var webpack = require('webpack');

var path = require('path');

// html 압축하기 위한 플러그인
// https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');

// css를 파일로 축출하기 위한 플러그인
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 이 객체를 module로 내보냄, 다른 코드에서 require('module')로 불러올 수 있다.
// 나중 Webpack 실행시 이 config 모듈을 불러와 설정파일로 사용함.
module.exports = {

  // webpack은 require를 통해 호출되는 파일들을 합쳐 하나로 만들어 줌. 그 시작 파일. 배열로 여러 파일을 전달할 수 도 있음.
  entry: [
    'babel-polyfill', // ie8 대응
    './src/index.js',
  ],

  // 합친 파일들을 'build'폴더에 'bundle.js'로 저장함
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js',
    //publicPath: '/assets'
  },

  module: {
    rules: [
      { // npm install --save-dev eslint-loader
        // ESLint 바르게 작동하는지 잘 모르곘음.
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: '/src/'
      },
      { // loader를 통하여 es6, react를 일반 javascript로 변환해줌.
        // 여기에 다른 로더를 사용하면 css도 require해서 사용할 수 있고 html도 압축할 수 있음
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?' + JSON.stringify({
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
        // $ npm install --save-dev css-loader style-loader
        test: /\.css$/,

        // 이 코드로 빌드하면 css파일이 js파일안에 들어간다. 즉 별도의 css 파일이 없다. 플러그인 없이 사용.
        // use: ['style-loader', 'css-loader']

        // 이 코드로 빌드하면 별도의 css파일이 생성된다. 플러그인과 같이 사용.
        use: ExtractTextPlugin.extract({
          use: 'css-loader?' + JSON.stringify({
            minimize: true,
            sourceMap: false
          })
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader?' + JSON.stringify({
                minimize: true,
                sourceMap: false
              })
            }, {
              loader: 'sass-loader'
            }],
            // use style-loader in development
            fallback: 'style-loader'
        })
      },
      {
        // $ npm install --save-dev file-loader
        // 이미지 경로 지정: https://stackoverflow.com/questions/33243399/webpack-outputs-wrong-path-for-images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=./images/[name].[ext]'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['url-loader?limit=5000&name=./images/[name].[ext]']
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

    // css파일 축출
    new ExtractTextPlugin('styles.css'),

    // 리액트 사용시 프로덕션 버전으로, 용량이 더 준다.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // js파일 압축
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
        drop_console: true // 콘솔 제거. https://stackoverflow.com/questions/41040266/remove-console-logs-with-webpack-uglify
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    // html 파일 압축 및 복사
    new htmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      inject: true,
      filename: __dirname + '/build/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunks: {
        head: {
          css: ['styles.css']
        }
      }
    }),

  ],

  //devtool: '#inline-source-map',
  // 개발자 도구 연동으로 디버깅시 컴파일된 코드가 아닌 작성한 코드로 볼 수 있다.

  //devtool: 'source-map',
};
