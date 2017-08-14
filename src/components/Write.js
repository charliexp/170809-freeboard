import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Write extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2>Write</h2>
        <div className="">
          <form action="" method="">
            <div className="form-group row">
              <label htmlFor="writer" className="col-sm-2 col-form-label">Writer</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="writer" name="writer" placeholder="Writer"></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="title" name="title" placeholder="Title"></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
              <div className="col-sm-10">
                <textarea rows="10" className="form-control" id="content" name="content"></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  myProp: PropTypes.string
};

Write.defaultProps = {
  myProp: 'some value'
};

export default Write;
