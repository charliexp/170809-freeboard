import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import koreaStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { Link, Redirect } from 'react-router-dom';
import { authBoard, deleteBoard, readBoard } from 'actions/board';
import { CheckPassword, Comment } from 'components';
import * as utils from 'lib/utils';
import Toast from 'lib/Toast';

const formatter = buildFormatter(koreaStrings);

class Read extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      type: '' // 수정모드인지 삭제모드인지 체크
    };
  }

  handleReload = () => {
    this.props.readBoard(this.props.match.params.id, 'read');
  }

  // 수정, 삭제 권한 체크 팝업
  handleCheckPop = (type, e) => {
    e.preventDefault();
    this.setState({
      modal: this.state.modal === true ? false : true,
      type: type
    })
  }

  // 수정 권한 체크
  handleCheckAuth = (password) => {
    const promise = this.props.authBoard(this.props.match.params.id, password)
    promise.then(() => {
      if (this.state.type === 'delete') { // 삭제 모드시
        if (this.props.status === 'AUTH_FAILURE') {
          new Toast().on(this.props.error.responseJSON.error, 2000);
        } else {
          const promise = this.props.deleteBoard(this.props.match.params.id, password);
          promise.then(() => {
            if (this.props.status === 'DELETE_SUCCESS') {
              $(location).attr('href', '#/board/0');
            }
          });
        }
      } else { // modify
        if (this.props.status === 'AUTH_FAILURE') {
          new Toast().on(this.props.error.responseJSON.error, 2000);
        }
      }
    });
  }

  componentDidMount() {
    this.props.readBoard(this.props.match.params.id, 'read');
  }

  shouldComponentUpdate(nextProps, nextState) {
    let current = {
      props: this.props,
      state: this.state
    };

    let next = {
      props: nextProps,
      state: nextState
    };

    let update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }

  render() {
    const data = this.props.response && this.props.response.results || {};
    console.log('read data: ', data);
    return(
      <div className="mb-4">
        {
          this.state.type === 'modify' && this.props.status === 'AUTH_SUCCESS' ? <Redirect to={`/board/modify/${this.props.match.params.id}`} /> : undefined
        }
        <h2>Read</h2>
          <div id="read" className="card">
            <div className="card-header">
              <h4 className="card-title mb-4">{data.title}</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                <span className="text-info mr-4">{data.writer}</span>
                <span className="mr-4">작성일: <TimeAgo date={data.created_at} formatter={formatter} /></span>
                <span className="mr-4">수정일: <TimeAgo date={data.updated_at} formatter={formatter} /></span>
                <span>조회수: {data.view_count}회</span></h6>
            </div>
            <div className="card-body">
              <p className="card-text" dangerouslySetInnerHTML={{__html: utils.nl2br(data.content)}}></p>
              <Link to={`/board/${0}`} className="btn btn-primary mr-1">목록</Link>
              <a href="#"
                className="btn btn-primary mr-1"
                onClick={this.handleCheckPop.bind(null, 'modify')}
                data-toggle="modal"
                data-target="#check-password"
                >수정</a>
              <a href="#"
                className="btn btn-primary"
                onClick={this.handleCheckPop.bind(null, 'delete')}
                >삭제</a>
            </div>
            <div className="card-footer">
              <Comment onReload={this.handleReload}/>
            </div>
          </div>
          {
            this.state.modal === true
            ? <CheckPassword
                onClose={this.handleCheckPop}
                onCheck={this.handleCheckAuth} />
          : undefined
          }
      </div>
    );
  }
}

Read.propTypes = {
  myProp: PropTypes.string
};

Read.defaultProps = {
  myProp: 'some value'
};

const mapStateToProps = state => {
  const { status, error, response } = state.board;
  return { status, error, response };
};

const mapDispatchToProps = dispatch => {
  return {
    authBoard: (id, password) => {
      return dispatch(authBoard(id, password));
    },
    deleteBoard: (id, password) => {
      return dispatch(deleteBoard(id, password));
    },
    readBoard: (id, type) => {
      return dispatch(readBoard(id, type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Read);
