// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import ConnectionPage from './ConnectionPage.js';

import uiConfig from '../../config/default/ui.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            connections: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        let {value} = event.target;
        this.setState((prevState, props) => {
            return {
                connections: value
            }
        });
    }

    render() {
        let tabHeaders = [
            <a className={"item wide " + (this.state.active == 0 ? "active" : "") } key="0">
                <i className="fa fa-wrench"></i>
            </a>
        ].concat([]);

        let page = <ConnectionPage connections={this.state.connections} onChange={this.handleChange}/>;

        return (<div className="main theme black">
            <div className="ui top attached tabular menu">
                {tabHeaders}
            </div>
            <div className="ui bottom attached active tab segment">
                {page}
            </div>
        </div>);
    }
}
