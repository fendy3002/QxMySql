// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import StateConnectModal from '../containers/StateConnectModal.js';

export default class ConnectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConnectModal: false,
            connectModalData: {},
            connectModalOnSubmit: this.submitAdd,
            connectModalConnectionIndex: 0
        };

        this.closeModal = this.closeModal.bind(this);
        this.addConnection = this.addConnection.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
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
                connectModalData: {},
                connectModalOnSubmit: this.submitAdd
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

    updateConnection(connection, index) {
        return (event) => {
            this.setState(() => {
                return {
                    showConnectModal: true,
                    connectModalData: connection,
                    connectModalConnectionIndex: index,
                    connectModalOnSubmit: this.submitUpdate
                };
            });
        }
    }

    submitUpdate(event) {
        let {connectModalConnectionIndex} = this.state; 
        let {onChange} = this.props;
        let {value} = event.target;

        let connections = this.props.connections;
        connections[connectModalConnectionIndex] = value;

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
        let {showConnectModal, connectModalData, connectModalOnSubmit} = this.state;
        let {connections} = this.props;
        
        let connectionDoms = connections.map((connection, index) => {
            return <div key={index}>
                {connection.name}
                <button className="ui button tiny" onClick={this.updateConnection(connection, index)}>
                    <i className="fa fa-wrench"></i>
                </button>
            </div>;
        });
        return [<div className="" key="0">
            <h2 className="ui dividing header">Connections</h2>
            <button type="button" className="ui button tiny"
                onClick={this.addConnection}>
                <i className="fa fa-plus"></i>
            </button>
            {connectionDoms}
        </div>, 
        <StateConnectModal visible={showConnectModal} onClose={this.closeModal} onSubmit={connectModalOnSubmit} connection={connectModalData} key="1"/>];
    }
}
