// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectModal from '../components/ConnectModal';
import {testConnection} from '../actions/connection.js';

var mapStateToProps = function(state){
  return {
  };
};

var mapDispatchToProps = function(dispatch, getState){
  return {
    testConnection: bindActionCreators(testConnection, dispatch)
  };
};

var StateConnectModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectModal);

export default StateConnectModal;