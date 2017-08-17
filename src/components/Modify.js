import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { modifyBoard, readBoard } from 'actions/board';
import Toast from 'lib/Toast';

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writer: '',
      title: '',
      content: '',
      password: ''
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.modifyBoard(
      this.props.match.params.id,
      this.state.writer,
      this.state.title,
      this.state.content,
      this.state.password
    )
    .then(() => {
      if (this.props.status === 'MODIFY_FAILURE') {
        new Toast().on(this.props.error.responseJSON.error, 2000);
      }
    });
  }

  componentDidMount() {
    this.props.readBoard(this.props.match.params.id, 'modify')
      .then(() => {
        const data = this.props.response && this.props.response.results || {};

        this.setState({
          writer: data.writer,
          title: data.title,
          content: data.content
        });
      });
  }

  render() {
    const data = this.props.response && this.props.response.results || {};

    return(
      <div>
        {
          this.props.status === 'MODIFY_SUCCESS' ? <Redirect to={`/board/read/${this.props.match.params.id}`} /> : undefined
        }
        <h2>Modify</h2>
        <div className="">
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
              <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
              <div className="col-sm-10">
                <textarea
                  rows="10"
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
                  placeholder="Confirm Password"
                  value={this.state.password}
                  onChange={this.handleChange}></input>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Modify.propTypes = {
  myProp: PropTypes.string
};

Modify.defaultProps = {
  myProp: 'some value'
};

const mapStateToProps = state => {
  const { status, error, response } = state.board;
  return { status, error, response };
};

const mapDispatchToProps = dispatch => {
  return {
    modifyBoard: (id, writer, title, content, password) => {
      return dispatch(modifyBoard(id, writer, title, content, password));
    },
    readBoard: (id, type) => {
      return dispatch(readBoard(id, type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modify);
