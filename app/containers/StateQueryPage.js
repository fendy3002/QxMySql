// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QueryPage from '../components/QueryPage';
import {getTable, getTables} from '../actions/database.js';
import {getSystemVariables} from '../actions/connection.js';
import {getExecute} from '../actions/query.js';

var mapStateToProps = function(state){
  return {
    server: state.server
  };
};

var mapDispatchToProps = function(dispatch, getState){
  return {
    getTable: bindActionCreators(getTable, dispatch),
    getTables: bindActionCreators(getTables, dispatch),
    getSystemVariables: bindActionCreators(getSystemVariables, dispatch),
    getExecute: bindActionCreators(getExecute, dispatch)
  };
};

var StateQueryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryPage);

export default StateQueryPage;