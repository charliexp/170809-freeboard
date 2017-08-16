var mongoose = require('mongoose');
module.exports = {
  // [post] http://localhost:3000/api/write
  write: function(req, res) {
    console.log('[post] /api/write 호출됨.');

    var writer = req.body.writer || req.query.content;
    var title = req.body.title || req.query.title;
    var content = req.body.content || req.query.content;
    var password = req.body.password || req.query.password;
    var database = req.app.get('database');

    if (typeof writer !== 'string' || writer.trim() === '') {
      return res.status(400).json({
        error: '작성자를 입력해주세요.'
      });
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: '제목을 입력해주세요.'
      });
    }

    if (typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({
        error: '내용을 입력해주세요.'
      });
    }

    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({
        error: '비밀번호를 입력해주세요.'
      });
    }

    if (database.db) {
      var post = new database.BoardModel({
        writer: writer,
        title: title,
        content: content,
        password: password // 스키마의 가상 프라퍼티가 호출되고 그 메서드에서 암호화 하여 저장하여 줌.
      });
      post.savePost(function(err, result) {
        if (err) throw err;
        console.log('글 데이터 추가함.');
        return res.json({
          success: true,
          id: result._id
        });
      });
    } else {
      failedDBConnect(res);
    }
  },

  // [get] http://localhost:3000/api/read/:id/:type
  read: function(req, res) {
    console.log('[get] /api/read 호출됨.');

    var id = req.body.id || req.query.id || req.params.id;
    var type = req.body.type || req.query.type || req.params.type || 'read';
    var database = req.app.get('database');

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: '잘못된 ID입니다.'
      });
    }

    if (typeof type !== 'string' || type.trim() === '') {
      return res.status(400).json({
        error: '타입을 지정해주세요. read or modify'
      });
    }

    if(database.db) {
      database.BoardModel.read(id, type, function(err, results) {
        if (err) {
          console.error('게시판 글 조회 중 오류 발생: ' + err.stack);
          return res.status(500).json({
            error: '게시판 조회 중 오류가 발생하였습니다.'
          });
        }

        if (results) {
          return res.json({
            results: results
          });
        } else {
          return res.status(404).json({
            error: '해당 게시물이 없습니다.'
          });
        }
      });
    } else {
      failedDBConnect(res);
    }
  },

  // [post] http://localhost:3000/api/auth
  auth: function(req, res) {
    console.log('[post] /api/auth 호출됨.');

    var id = req.body.id || req.query.id;
    var password = req.body.password || req.query.password;
    var database = req.app.get('database');

    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({
        error: '비밀번호를 입력해주세요.'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: '잘못된 ID입니다.'
      });
    }

    if (database.db) {
      database.BoardModel.findById(id, function(err, result) {
        if (err) throw err;

        if (result) {
          if (result.authenticate(password, result.hashed_password)) {
            return res.json({
              success: true
            });
          } else {
            return res.status(403).json({
              error: '수정 권한이 없습니다.'
            });
          }
        } else {
          return res.status(404).json({
            error: '해당 글이 존재하지 않습니다.',
            code: 4
          });
        }
      });
    } else {
      failedDBConnect(res);
    }
  },

  // [put] http://localhost:3000/api/modify/:id
  modify: function(req, res) {
    console.log('[put] /api/modify 호출됨.');

    var id = req.body.id || req.query.id || req.params.id;
    var writer = req.body.writer || req.query.content;
    var title = req.body.title || req.query.title;
    var content = req.body.content || req.query.content;
    var password = req.body.password || req.query.password;
    var database = req.app.get('database');

    if (typeof writer !== 'string' || writer.trim() === '') {
      return res.status(400).json({
        error: '작성자를 입력해주세요.'
      });
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: '제목을 입력해주세요.'
      });
    }

    if (typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({
        error: '내용을 입력해주세요.'
      });
    }

    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({
        error: '비밀번호를 입력해주세요.'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: '잘못된 ID입니다.'
      });
    }

    if (database.db) {
      database.BoardModel.findOne({_id: id}, function(err, result) {
        if (err) throw err;
        if (result) {
          if (result.authenticate(password, result.hashed_password)) {
            result.writer = writer;
            result.title = title;
            result.content = content;
            result.updated_at = Date.now();
            result.savePost(function(err, result) {
              if (err) throw err;
              console.log('글 수정됨.');
              return res.json({
                success: true
              });
            });
          } else {
            return res.status(403).json({
              error: '수정 권한이 없습니다.'
            });
          }
        } else {
          return res.status(404).json({
            error: '해당 글이 존재하지 않습니다.'
          });
        }
      });
    } else {
      failedDBConnect(res);
    }
  },

  // [delete] http://localhost:3000/api/delete/:id
  delete: function(req, res) {
    console.log('[delete] /api/delete 호출됨.');

    var id = req.body.id || req.query.id || req.params.id;
    var password = req.body.password || req.query.password;
    var database = req.app.get('database');

    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({
        error: '비밀번호를 입력해주세요.'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: '잘못된 ID입니다.'
      });
    }

    if (database.db) {
      database.BoardModel.findOne({_id: id}, function(err, result) {
        if (err) throw err;
        if (result) {
          if (result.authenticate(password, result.hashed_password)) {
            result.remove({_id: id}, function(err) {
              if (err) throw err;
              return res.json({
                success: true
              });
            });
          } else {
            return res.status(403).json({
              error: '삭제 권한이 없습니다.'
            });
          }
        } else {
          return res.status(404).json({
            error: '해당 글이 존재하지 않습니다.'
          });
        }
      });
    } else {
      failedDBConnect(res);
    }
  },

  // [post] http://localhost:3000/api/list
  // [get] http://localhost:3000/api/list/:page/:perPage
  // [get] http://localhost:3000/api/list?page=0&perPage=2
  list: function(req, res) {
    console.log('[get | post] /api/list 호출됨.');
    // page: 현재 페이지의 인덱스. 0
    // perPage: 한 페이지당 글의 개수
    // count: 전체 글의 개수
    // pageCount: 전체 페이지 수. Math.ceil(count / perPage)

    var page = req.body.page || req.query.page || req.params.page || 0;
    var perPage = req.body.perPage || req.query.perPage || req.params.perPage || 2;
    var database = req.app.get('database');

    if (database.db) {
      database.BoardModel.list({page: page, perPage: perPage}, function(err, results) {
        if (err) {
          throw err;
          // return res.status(500).json({
          //   error: '리스트 조회중 오류가 발생하였습니다.'
          // });
        }
        if (results) {
          database.BoardModel.count().exec(function(err, count) {
            res.json({
              list: results,
              page: page,
              perPage: perPage,
              count: count,
              pageCount: Math.ceil(count / perPage)
            });
          });
        } else {
          return res.status(416).json({
            error: '해당 글목록이 존재하지 않습니다.'
          });
        }
      });
    } else {
      failedDBConnect(res);
    }
  }

};

function failedDBConnect(res) {
  return res.status(501).json({
    error: '데이터베이스 연결 실패'
  });
}
