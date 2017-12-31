// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import uiConfig from '../../config/default/ui.js';

let defaultConnection = {
    name: "",
    host: "",
    port: "3306",
    user: "",
    password: ""
};

export default class ConnectModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            connection: defaultConnection
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTestConnection = this.handleTestConnection.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.connection.name != this.props.connection.name){
            this.setState((prevState, props) => {
                return {
                    connection: {
                        ...defaultConnection,
                        ...newProps.connection
                    }
                };
            })
        }
    }

    handleInputChange(event){
        let {name, value} = event.target;

        this.setState((prevState, props) => {
            return {
                connection: {
                    ...prevState.connection,
                    [name]: value
                }
            }
        });
    }

    handleSubmit(event) {
        let {mode, onSubmit} = this.props;
        event.preventDefault();

        onSubmit({
            target: {
                value: this.state.connection,
                name: this.props.name
            }
        });

        return false;
    }

    handleClose() {
        let {onClose} = this.props;

        this.setState((prevState, props) => {
            return {
                connection: defaultConnection
            };
        });
        onClose();
    }

    handleTestConnection(){
        this.props.testConnection(this.state.connection);
    }

    render() {
        let {visible} = this.props;
        let {connection} = this.state;

        let cssVisible = visible ? "visible active" : "";
        return (
            <div className={"ui dimmer modals page transition " + cssVisible}>
                <div className="ui long test modal transition visible active" style={{ transform: "translateX(0%) translateY(-50%)" }}> 
                    <div className="header">
                        MySql Server Connection

                        <button type="button" className="ui tiny button" style={{ float: "right" }}
                            onClick={this.handleClose}>
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                    <div className="image content">
                        <form className="ui form container" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label>Connection Name</label>
                                <input type="text" placeholder="e.g. MyLocalConnection" 
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={connection.name} />
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label>Host</label>
                                    <input type="text" placeholder="Host" 
                                        name="host"
                                        onChange={this.handleInputChange}
                                        value={connection.host} />
                                </div>
                                <div className="field">
                                    <label>Port</label>
                                    <input type="text" placeholder="Port" 
                                        name="port"
                                        onChange={this.handleInputChange}
                                        value={connection.port} />
                                </div>
                            </div>
                            <div className="field">
                                <label>Username</label>
                                <input type="text" placeholder="Username" 
                                    name="user"
                                    onChange={this.handleInputChange}
                                    value={connection.user} />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" placeholder="Password" 
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={connection.password} />
                            </div>
                            <button className="ui primary button" type="submit">Submit</button>
                            <button className="ui button" type="button" onClick={this.handleTestConnection}>Test Connection</button>
                            <button className="ui secondary button" type="button" onClick={this.handleClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
