import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute } from 'react-router';
import App from './App';
//import DevTools from './DevTools';

import NoMatch from '../components/NoMatch';
import Welcome from './Welcome';

// Demo
import BaoZhangRenPage from './BaoZhangRenPage';
import ZuoYeRenPage from './ZuoYeRenPage';

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <div>
          <Router>
            <Route path="/" component={App}>
              <IndexRoute component={Welcome}/>
              <Route path="/welcome" component={Welcome}></Route>
              <Route path="/baozhangren" component={BaoZhangRenPage}></Route>
              <Route path="/zuoyeren" component={ZuoYeRenPage}></Route>
              <Route path="*" component={NoMatch} />
            </Route>
          </Router>
          {/* Being the dev version of our Root component, we include DevTools below */}
          {/*<DevTools />*/}
        </div>
      </Provider>
    );
  }
};
