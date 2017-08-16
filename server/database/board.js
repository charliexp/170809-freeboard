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
        writer: {type: mongoose.Schema.ObjectId, ref: 'users'},
        content: {type: String, trim: true, 'default': ''},
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
      addComment: function(user, comment, callback) {
        this.comments.push({
          content: comment.content,
          writer: user._id
        });
        this.save(callback);
      },
      removeComment: function(id, callback) {
        var index = indexOf(this.comments, {id: id});
        if (~index) {
          this.comments.splice(index, 1);
        } else {
          return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
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
            console.log(result);
            var _result = {
              _id: result._id,
              comments: result.comments,
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
  var result = arr.filter(function(doc, idx) {
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
