// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import {saveConnections, testConnection} from '../actions/connection.js';

var mapStateToProps = function(state){
  return {
      request: state.request,
      server: state.server
  };
};

var mapDispatchToProps = function(dispatch, getState){
  return {
    saveConnections: bindActionCreators(saveConnections, dispatch),
    testConnection: bindActionCreators(testConnection, dispatch)
  };
};

var HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomePage;