import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { fakeRequest } from 'actions/fake';
import { List, Modify, Read, Write } from 'components';
import 'bootstrap/dist/css/bootstrap.css';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const match = this.props.match;

    return(
      <div id="board" className="container">
        <h1>Board</h1>
        {/*<Redirect from={`${match.path}`} to={`${match.path}/0`} />*/}
        <Switch>
          <Route path={`${match.path}/read/:id`} component={Read} />
          <Route path={`${match.path}/write`} component={Write} />
          <Route path={`${match.path}/modify/:id`} component={Modify} />
          <Route path={`${match.path}/:page/:perPage`} component={List} />
          <Route path={`${match.path}/:page`} component={List} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const { status, error, data, postId } = state.fake.list;
//   return {
//     status,
//     error,
//     data,
//     postId
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     fakeRequest: (postId) => {
//       return dispatch(fakeRequest(postId));
//     }
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(Board);
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
export default withRouter(Board);
