// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import server from './server';
import request from './request';

const rootReducer = combineReducers({
  server,
  request,
  router,
});

export default rootReducer;
