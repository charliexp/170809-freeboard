import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from 'stores/configureStore';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Board, Fake, Header, Home } from 'containers';
import 'css/app.css';

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        {/*<Router basename="/html5/es6/170620_react_test/build">*/}
        <Router>
          <div>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/about/:id" component={About} />
            </Switch>
            <Route path="/fake" component={Fake} />
            <Route path="/board" component={Board} />
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  myProp: PropTypes.string
};

App.defaultProps = {
  myProp: 'some value'
};

export default App;
