import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute } from 'react-router';

import { configureStore } from './store/configureStore';

import ShenpirenPage from './containers/ShenpirenPage';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <ShenpirenPage />
  </Provider>,
  document.getElementById('root')
);
