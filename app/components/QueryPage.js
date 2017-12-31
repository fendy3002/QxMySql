// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import StateConnectModal from '../containers/StateConnectModal.js';

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConnectModal: false,
            connectModalData: {},
            connectModalOnSubmit: this.submitAdd,
            connectModalConnectionIndex: 0
        };

    }

    render() {
        let {} = this.state;
        let {openQuery} = this.props;
        
        return <div className="" key="0">
            {openQuery.connection.name}
        </div>;
    }
}
