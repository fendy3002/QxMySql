import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import context from './server/context.js';
import './app.global.css';

import {getConnections} from './actions/connection.js';

let createFunction = (when) => {
  let defaultAssert = {
      inConnectionPage: false,
      inQueriesPage: false,
      inQueryEditor: false,
      inDatabaseItem: false
  };

  let assignment = Object.keys(defaultAssert).map((assert) => {
    return "let " + assert + " = assert." + assert + ";";
  }).join("");

  let body = 'let assert = Object.assign({}, this, obj); '+ assignment +' return ' + when;
  return new Function('obj', body).bind(defaultAssert);
};

const store = configureStore({
  server: {
    ...context,
    keyboard: context.keyboard.map((config, index) => {
      return {
          "key": config.key,
          "command": config.command,
          "when": createFunction(config.when)
      }
    })
  },
  request: {
    connections: []
  }
});
store.dispatch(getConnections());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
