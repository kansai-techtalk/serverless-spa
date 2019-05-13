import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { HashRouter as Router } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import App from './containers/App';
import reducer from './reducers';
import rootSaga from './sagas';
import './index.css';
import * as serviceWorker from './serviceWorker';

// saga
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  logger,
  sagaMiddleware,
];

// storeを作成
const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
