var crypto = require('crypto');
var Schema = {
  createSchema: function(mongoose) {
    var BoardSchema = mongoose.Schema({
      writer: {type: String, trim: true, 'default': ''},
      title: {type: String, trim: true, 'default': ''},
      content: {type: String, trim: true, 'default': ''},
      salt: {type: String, require: true},
      hashed_password: {type: String, require: true, 'default': ''},
      created_at: {type: Date, index: {unique: false}, 'default': Date.now},
      updated_at: {type: Date, index: {unique: false}, 'default': Date.now},
      view_count: {type: Number, 'default': 0},
      comments: [{
        writer: {type: String, trim: true, 'default': ''},
        content: {type: String, trim: true, 'default': ''},
        hashed_password: {type: String, require: true, 'default': ''},
        created_at: {type: Date, 'default': Date.now}
      }]
    });

    BoardSchema.path('writer').required(true, '작성자를 입력하셔야 합니다.');
    BoardSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
    BoardSchema.path('content').required(true, '글 내용을 입력하셔야 합니다.');

    BoardSchema.methods = {
      savePost: function(callback) {
        var self = this;

        this.validate(function(err) {
          if (err) return callback(err);
          self.save(callback);
        });
      },
      addComment: function(writer, content, password, callback) {
        this.comments.push({
          writer: writer,
          content: content,
          hashed_password: this.encryptPassword(password) // salt는 하나만 사용.
        });
        this.save(callback);
      },
      removeComment: function(commentId, password, callback) {
        var index = indexOf(this.comments, {id: commentId});
        if (~index) {
          if (this.authenticate(password, this.comments[index].hashed_password)) {
            this.comments.splice(index, 1);
          } else {
            return callback({code: 403, msg: '삭제 권한이 없습니다.'});
          }
        } else {
          return callback({code:404, msg: '해당 댓글을 찾을 수 없습니다.'});
        }
        this.save(callback);
      }
    };

    BoardSchema.statics = {
      // ID로 글찾기
      read: function(id, type, callback) {
        this.findOne({_id: id}, function(err, result) {
          if (err) {
            return callback(err, null);
          }
          if (result) {
            if (type === 'read') { // 수정모드에서도 이 메소드가 실행되므로 읽기에서만 뷰 카운트 올라가야함.
              result.viewCount(1);
            }

            // hashed_password 제거후 전달
            var comments = JSON.parse(JSON.stringify(result.comments)).map(function(value, index) {
              delete value.hashed_password;
              return value;
            });

            var _result = {
              _id: result._id,
              comments: comments,
              view_count: result.view_count,
              updated_at: result.updated_at,
              created_at: result.created_at,
              content: result.content,
              title: result.title,
              writer: result.writer
            };
            
            return callback(null, _result);
          }
        });
      },
      // 모든 데이터를 조회할 때 사용(페이징)
      list: function(options, callback) {
        var criteria = options.criteria || {};
        this.find(criteria)
          .sort({'created_at': -1})
          .limit(Number(options.perPage))
          .skip(options.perPage * options.page)
          .exec(callback);
      }
    };

    BoardSchema.virtual('password').set(function(password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
    }).get(function() {
      return this._password;
    });

    BoardSchema.method('makeSalt', function() {
      return Math.round(new Date().valueOf() * Math.random()) + '';
    });

    BoardSchema.method('encryptPassword', function(plainText) {
      return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
    });

    BoardSchema.method('authenticate', function(planeText, hashed_password) {
        return this.encryptPassword(planeText) === hashed_password;
    });

    BoardSchema.method('viewCount', function(number) {
      this.view_count += number;
      this.save();
    });

    console.log('BoardSchema 정의함.');

    return BoardSchema;
  }
};

function indexOf(arr, obj) {
  var index = -1;
  var keys = Object.keys(obj);
  arr.filter(function(doc, idx) {
    var matched = 0;
    for (var i = keys.length - 1; i >= 0; i--) {
      if (doc[keys[i]] === obj[keys[i]]) {
        matched++;
        if (matched === keys.length) {
          index = idx;
          return idx;
        }
      }
    }
  });

  return index;
}


module.exports = Schema;
