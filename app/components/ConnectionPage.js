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
        this.removeConnection = this.removeConnection.bind(this);
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

    removeConnection(index){
        let {connections, onChange} = this.props;
        if(confirm("Are you sure to delete connection " + connections[index].name + "?")){
            connections.splice(index, 1);
            onChange({
                target:{
                    name: this.props.name,
                    value: connections
                }
            });
        }
    }

    render() {
        let {showConnectModal, connectModalData, connectModalOnSubmit} = this.state;
        let {connections, onOpenConnection} = this.props;
        
        let connectionDoms = connections.map((connection, index) => {
            return <div className="card" key={index}>
                <div className="content">
                    <div className="header">
                        {connection.name}
                        <button className="ui button red compact mini right floated"
                            type="button"
                            onClick={() => this.removeConnection(index)}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                    <div className="meta">
                        {connection.host}
                    </div>
                </div>
                <div className="content">
                    <button className="ui button primary compact mini" onClick={() => onOpenConnection(connection)}>
                        <i className="fa fa-link"></i> Connect
                    </button>
                    <button className="ui button green compact mini" onClick={this.updateConnection(connection, index)}>
                        <i className="fa fa-wrench"></i>
                    </button>
                </div>
            </div>;
        });
        return [<div className="" key="0">
            <div className="ui segment vertical">
                <h2 className="ui dividing header">Connections</h2>
                <button type="button" className="ui button tiny"
                    onClick={this.addConnection}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="ui segment vertical">
                <div className="ui stackable cards">
                    {connectionDoms}
                </div>
            </div>
        </div>, 
        <StateConnectModal visible={showConnectModal} onClose={this.closeModal} 
            onSubmit={connectModalOnSubmit} connection={connectModalData} key="1"/>];
    }
}
