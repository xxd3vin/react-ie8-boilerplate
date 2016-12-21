import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute } from 'react-router';

import { configureStore } from './store/configureStore';

import PortalDatePickerPage from './containers/PortalDatePickerPage';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <PortalDatePickerPage />
  </Provider>,
  document.getElementById('root')
);
