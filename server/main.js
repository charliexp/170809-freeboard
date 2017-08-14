/**
  @desc
*/
var bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  expressErrorHandler = require('express-error-handler'),
  expressSession = require('express-session'),
  http = require('http'),
  path = require('path'),
  serveStatic = require('serve-static');

var config = require('./config');
var database = require('./database/database');
var route_loader = require('./routes');

var app = express();
app.set('port', process.env.PORT || config.server_port);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', serveStatic(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
  secret: 'micro$blog', // 쿠키를 임의로 변조하는것을 방지하기 위한 값 입니다. 이 값을 통하여 세션을 암호화 하여 저장합니다.
  resave: true, // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
  saveUninitialized: true // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.
}));

route_loader(app);

var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

process.on('SIGTERM', function () {
    console.log('프로세스가 종료됩니다.');
    app.close();
});

app.on('close', function () {
	console.log('Express 서버 객체가 종료됩니다.');
	if (database.db) {
		database.db.close();
	}
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('서버가 시작되었습니다. 포트: ', app.get('port'));
  database.connect(app, config);
});
