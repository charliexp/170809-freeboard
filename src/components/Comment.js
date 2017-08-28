import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import koreaStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { deleteComment, writeComment } from 'actions/board';
import { CheckPassword } from 'components';
import Toast from 'lib/Toast';

const formatter = buildFormatter(koreaStrings);

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writer: '',
      content: '',
      password: '',
      modal: false,
      commentId: null
    };
  }

  // 수정, 삭제 권한 체크 팝업
  handleCheckPop = (e) => {
    //e.preventDefault();
    if (e.target) {
      this.setState({
        commentId: e.currentTarget.name
      });
    }
    this.setState({
      modal: this.state.modal === true ? false : true,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  // 삭제 버튼 클릭시
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.writeComment(Object.assign(this.state, {id: this.props.response.results._id}))
      .then(() => {
        if (this.props.status === 'COMMENT_WRITE_FAILURE') {
          new Toast().on(this.props.error.responseJSON.error, 2000);
        } else {
          this.setState({
            writer: '',
            content: '',
            password: ''
          });

          this.props.onReload();
        }
      });
  }

  handleDelete = (password) => {
    this.props.deleteComment(this.props.response.results._id, this.state.commentId, password)
      .then(() => {
        if (this.props.status === 'COMMENT_DELETE_FAILURE') {
          new Toast().on(this.props.error.responseJSON.error, 2000);
        } else if(this.props.status === 'COMMENT_DELETE_SUCCESS') {
          this.setState({
            modal: this.state.modal === true ? false : true,
          });
          this.props.onReload();
        }
      });
  }

  render() {
    const data = this.props.response
      && this.props.response.results
      && this.props.response.results.comments || [];
    return(
      <div id="comment" className="">
        <div className="write-comment">
          <form action="" method="" onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="writer" className="col-sm-2 col-form-label">Writer</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="writer"
                  name="writer"
                  placeholder="Writer"
                  value={this.state.writer}
                  onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
              <div className="col-sm-10">
                <textarea
                  rows="3"
                  className="form-control"
                  id="content"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}></input>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <hr></hr>
        {
          data.map((value, index) => {
            return (
              <div key={index} className="mb-2">
                <span className="writer text-info mr-4">{value.writer}</span>
                <span className="content mr-4">{value.content}</span>
                <TimeAgo date={value.created_at} formatter={formatter} className="text-secondary"/>
                <button
                  type="button"
                  name={value._id}
                  className="close"
                  aria-label="Close"
                  onClick={this.handleCheckPop}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            );
          })
        }
        {
          this.state.modal === true
            ? <CheckPassword
                onClose={this.handleCheckPop}
                onCheck={this.handleDelete} />
            : undefined
        }
      </div>
    );
  }
}

Comment.propTypes = {
  myProp: PropTypes.string
};

Comment.defaultProps = {
  myProp: 'some value'
};

const mapStateToProps = state => {
  const { status, error, response } = state.board;
  return { status, error, response };
};

const mapDispatchToProps = dispatch => {
  return {
    writeComment: (data) => {
      return dispatch(writeComment(data));
    },
    deleteComment: (id, commentId, password) => {
      return dispatch(deleteComment(id, commentId, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
