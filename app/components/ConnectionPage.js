// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import ConnectModal from './ConnectModal.js';

export default class ConnectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConnectModal: false,
            connectModalData: {}
        };

        this.closeModal = this.closeModal.bind(this);
        this.addConnection = this.addConnection.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }

    closeModal() {
        this.setState(() => {
            return {
                showConnectModal: false
            };
        });
    }

    addConnection() {
        this.setState(() => {
            return {
                showConnectModal: true,
                connectModalData: {}
            };
        });
    }

    submitAdd(event) {
        let {onChange} = this.props;
        let {value} = event.target;

        let connections = this.props.connections.concat(value);

        onChange({
            target:{
                name: this.props.name,
                value: connections
            }
        });
        this.setState(() => {
            return {
                showConnectModal: false,
                connectModalData: {}
            };
        });
    }

    render() {
        let {showConnectModal, connectModalData} = this.state;
        let {connections} = this.props;
        
        let connectionDoms = connections.map((connection, index) => {
            return <div key={index}>{connection.name}</div>;
        });
        return [<div className="" key="0">
            <h2 className="ui dividing header">Connections</h2>
            <button type="button" className="ui button tiny"
                onClick={this.addConnection}>
                <i className="fa fa-plus"></i>
            </button>
            {connectionDoms}
        </div>, 
        <ConnectModal visible={showConnectModal} onClose={this.closeModal} onSubmit={this.submitAdd} connection={connectModalData} key="1"/>];
    }
}
