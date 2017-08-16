import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class Paging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagingAr: []
    };

    this.blockIdx = 0; // 페이징 현재 블록의 인덱스, 0부터 시작
    this.firstFlag = true; // 처음과 마지막일때 블럭 이동 버튼 비활성화
    this.lastFlag = true;
  }

  handleBlock = (num, e) => {
    e.preventDefault();
    this.blockIdx += num;
    let pagingStartIndex = 1 + this.props.pageCount - (this.props.pageCount - (this.props.maxPagingLen * this.blockIdx));
    let pagingLen = Math.min(this.props.maxPagingLen, this.props.pageCount - (pagingStartIndex - 1));
    let pagingAr = [];
    for (let i = 0; i < pagingLen; i += 1) {
      pagingAr.push(pagingStartIndex + i);
    }

    this.firstFlag = (pagingStartIndex === 1) ? true : false;
    if (this.props.pageCount - pagingStartIndex < this.props.maxPagingLen) {
      this.lastFlag = true;
    } else {
      this.lastFlag = false;
    }

    this.setState({
      pagingAr: pagingAr
    });
  }

  initPages = () => {
    let pagingStartIndex = Math.floor(this.props.page / this.props.maxPagingLen) * this.props.maxPagingLen + 1;
    //let pagingStartIndex = 1 + this.props.pageCount - (this.props.pageCount - (this.props.maxPagingLen * this.blockIdx));
    let pagingLen = Math.min(this.props.maxPagingLen, this.props.pageCount - (pagingStartIndex - 1));
    let pagingAr = []; // 렌더링하기위해 페이징을 배열로
    for (let i = 0; i < pagingLen; i += 1) {
      pagingAr.push(pagingStartIndex + i);
    }

    this.firstFlag = (pagingStartIndex === 1) ? true : false;
    if (this.props.pageCount - pagingStartIndex < this.props.maxPagingLen) {
      this.lastFlag = true;
    } else {
      this.lastFlag = false;
    }
    this.blockIdx = Math.floor(pagingStartIndex / this.props.maxPagingLen);

    this.setState({
      pagingAr: pagingAr
    });
  }

  componentDidMount() {
    this.initPages();

  }

  render() {
    return(
      <div id="paging" className="">
        <nav aria-label="Page navigation example" className="d-inline-block">
          <ul className="pagination">
            <li className={classNames("page-item", {disabled: this.firstFlag})}>
              <a className="page-link" href="#" aria-label="Previous" onClick={this.handleBlock.bind(null, -1)}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {
              this.state.pagingAr && this.state.pagingAr.map(function(value, index) {
                return (
                  <li className="page-item" key={index}>
                    <Link to={`/board/${value-1}`} className="page-link">{value}</Link>
                  </li>
                );
              })
            }
            <li className={classNames("page-item", {disabled: this.lastFlag})}>
              <a className="page-link" href="#" aria-label="Next" onClick={this.handleBlock.bind(null, 1)}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        <Link to="/board/write" className="btn btn-primary float-right">write</Link>
        {/*<button type="button" className="btn btn-primary float-right">write</button>*/}
      </div>
    );
  }
}

Paging.propTypes = {
  maxPagingLen: PropTypes.number, // 한 블록의 최대 길이
};

Paging.defaultProps = {
  maxPagingLen: 2
};

export default Paging;
