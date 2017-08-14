import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paging } from 'components';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="list" className="table-responsive">
        <h2>List</h2>
        <table className="table table-hover">
          <thead className="thead-default">
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>댓글수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>some title</td>
              <td>chris</td>
              <td>a few minuts ago</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>some title</td>
              <td>chris</td>
              <td>a few minuts ago</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>some title</td>
              <td>chris</td>
              <td>a few minuts ago</td>
              <td>100</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
        <Paging />
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

export default List;
