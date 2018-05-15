/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate code
 *
 */

// Import all the third party stuff
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PageActions } from './actions';
import { CookiesProvider } from 'react-cookie';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import immutableStateMiddleware from 'redux-immutable-state-invariant';
import rootReducer from './reducers';
import DevTools from './pages/DevTools/DevTools';

const history = createHistory();

const middlewares = [thunkMiddleware];
const routerMiddlewareInstance = routerMiddleware(history);

middlewares.push(routerMiddlewareInstance);

if (!PRODUCTION) {
  middlewares.push(immutableStateMiddleware());
}

function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    DevTools.instrument()
  ));
}

const isProd = process.env.NODE_ENV === 'production';
injectTapEventPlugin();

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
}

const mountNode = document.getElementById('app');
const store = configureStore();

const renderApp = () => {
  const App = require('./pages/App/App').default; //eslint-disable-line global-require

  render((
    <AppContainer>
      <CookiesProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </CookiesProvider>
    </AppContainer>
  ), mountNode);
};

if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default; //eslint-disable-line global-require

      render(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('./pages/App/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);

      reRenderApp();
    });
  });
}

renderApp();
