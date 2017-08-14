import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';

// production에서 logger 제거
// https://github.com/evgenyrodionov/redux-logger/issues/6
let createStoreWithMiddleWare;

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();
  createStoreWithMiddleWare = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
} else {
  createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleWare(rootReducer, initialState);

  /**
   * @desc 아래 유알엘 참조하여 react-hot-loader관련 에러 해결함.
   <Provider> does not support changing `store` on the fly.
   It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically.
   See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions.
   */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
