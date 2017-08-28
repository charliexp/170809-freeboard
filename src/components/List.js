import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import koreaStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { Link, Redirect } from 'react-router-dom';
import { listBoard } from 'actions/board';
import { Paging } from 'components';

const formatter = buildFormatter(koreaStrings);

class List extends Component {
  constructor(props) {
    super(props);
  }

  handleRead = (e) => {
    $(location).attr('href', `#/board/read/${e.currentTarget.id}`);
  }

  componentDidMount() {
    this.props.listBoard(this.props.match.params.page, 3);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.componentDidMount();
    }
  }

  render() {
    const data = this.props.response && this.props.response.list || [];

    return(
      <div id="list" className="table-responsive">
        <h2>List</h2>
        <table className="table table-hover">
          <thead className="thead-default">
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>댓글수</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value, index) => {
                return(
                  <tr key={index} id={value._id} onClick={this.handleRead}>
                    <td scope="row">{value.title}</td>
                    <td>{value.writer}</td>
                    <td>
                      <TimeAgo date={value.created_at} formatter={formatter} />
                    </td>
                    <td>{value.view_count}</td>
                    <td>{value.comments.length}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {
          this.props.response ? <Paging
            count={this.props.response.count}
            page={this.props.response.page}
            perPage={this.props.response.perPage}
            pageCount={this.props.response.pageCount} /> : undefined
        }
      </div>
    );
  }
}

List.propTypes = {
  myProp: PropTypes.string
};

List.defaultProps = {
  myProp: 'some value'
};

const mapStateToProps = state => {
  const { status, error, response } = state.board;
  return { status, error, response };
};

const mapDispatchToProps = dispatch => {
  return {
    listBoard: (page, perPage) => {
      return dispatch(listBoard(page, perPage));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
