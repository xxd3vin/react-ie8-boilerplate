import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute } from 'react-router';

import { configureStore } from './store/configureStore';
import App from './containers/App';

import NoMatch from './components/NoMatch';
import Welcome from './containers/Welcome';

import ZuoYeRenPage from './containers/ZuoYeRenPage';

const store = configureStore();
ReactDom.render(
  <Provider store={store}>
    <ZuoYeRenPage />
  </Provider>,
  document.getElementById('root')
);