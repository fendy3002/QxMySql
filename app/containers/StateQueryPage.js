// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QueryPage from '../components/QueryPage';
import {getTable, getTables} from '../actions/database.js';
import {getSystemVariables} from '../actions/connection.js';

var mapStateToProps = function(state){
  return {
  };
};

var mapDispatchToProps = function(dispatch, getState){
  return {
    getTable: bindActionCreators(getTable, dispatch),
    getTables: bindActionCreators(getTables, dispatch),
    getSystemVariables: bindActionCreators(getSystemVariables, dispatch)
  };
};

var StateQueryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryPage);

export default StateQueryPage;