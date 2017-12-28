// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import ConnectModal from './ConnectModal.js';

import uiConfig from '../../config/default/ui.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };

    }
    render() {
        let tabHeaders = [
            <a className={"item wide " + (this.state.active == 0 ? "active" : "") }>
                <i className="fa fa-wrench"></i>
            </a>
        ].concat([]);

        return (<div className="main theme black">
            <div className="ui top attached tabular menu">
                {tabHeaders}
            </div>
            <div className="ui bottom attached active tab segment">
                First
            </div>
        </div>);
    }
}
