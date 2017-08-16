import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'css/check-password.css';

class CheckPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ''
    };
  }

  handleChange = () => {
    this.setState({
      password: this.textInput.value
    });
  };

  render() {
    return(
      <div id="check-password" className="modal show d-block" role="dialog" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Password</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={this.props.onClose.bind(null, '')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                ref={(input) => {this.textInput = input;}}
                onChange={this.handleChange}></input>
              <p className="text-muted mt-2">비밀번호를 입력해주세요.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClose.bind(null, '')}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.props.onCheck.bind(null, this.state.password)}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckPassword.propTypes = {
  myProp: PropTypes.string
};

CheckPassword.defaultProps = {
  myProp: 'some value'
};

export default CheckPassword;
