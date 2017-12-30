// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import server from './server';
import request from './request';

const rootReducer = combineReducers({
  server,
  request,
  router,
  toastr: toastrReducer
});

export default rootReducer;
