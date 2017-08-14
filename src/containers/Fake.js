import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { fakeRequest } from 'actions/fake';
import 'css/fake.css';

class Fake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  // 생성자에서 바인딩을 해주어야 하나 에로우함수를 쓰면 안해주어도 됨.
  handleNext = () => {
    let next = this.props.postId + 1;
    this.props.fakeRequest(next);
  }

  componentDidMount() {
    this.props.fakeRequest(1);
  }

  render() {
    return(
      <div id="fake">
        <h2>Fake</h2>
        <p>비동기 데이터 로드 샘플:</p>
        <ul>
          <li>id:{this.props.data.id}</li>
          <li>title:{this.props.data.title}</li>
          <li>body:{this.props.data.body}</li>
        </ul>
        <button onClick={this.handleNext}>next</button>
        <h3 className={
            classNames({'on': !!this.state.name.length})
          }>Hello! {this.state.name}</h3>
        <button onClick={
            () => {
              this.setState({
                name: 'Chris'
              });
            }
          }>Click</button>
      </div>
    );
  }
}

Fake.propTypes = {
  myProp: PropTypes.string
};

Fake.defaultProps = {
  myProp: 'some value'
};

const mapStateToProps = state => {
  const { status, error, data, postId } = state.fake.list;
  return {
    status,
    error,
    data,
    postId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fakeRequest: (postId) => {
      return dispatch(fakeRequest(postId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fake);
