// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import uiConfig from '../../config/default/ui.js';

export default class ConnectModal extends Component {
  render() {
    return (
        <div className="ui dimmer modals page transition visible active">
            <div className="ui long test modal transition visible active scrolling" style={{ top: "100px" }}> 
                <div className="header">
                    Connect to MySql Server
                </div>
                <div className="image content">
                    <form className="ui form container">
                        <div className="two fields">
                            <div className="field">
                                <label>Host</label>
                                <input type="text" name="host" placeholder="Host" />
                            </div>
                            <div className="field">
                                <label>Port</label>
                                <input type="text" name="port" placeholder="Port" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}
