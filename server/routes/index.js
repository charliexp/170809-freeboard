var express = require('express'),
config = require('../config'),
router = express.Router();

module.exports = function(app) {
  var infoLen = config.route_info.length;
  console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);

  for (var i = 0; i < infoLen; i += 1) {
    var curItem = config.route_info[i];
    var curModule = require(curItem.file);
    console.log('%s 파일에서 모듈정보를 읽어옴.', curItem.file);

    // router.route('/some').post(function(req, res) { ...});
    router.route(curItem.path)[curItem.type](curModule[curItem.method]);

    console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.method);
  }
  app.use('/', router);
};
