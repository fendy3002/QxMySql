import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="ui left vertical sidebar icon menu pointing overlay visible">
            <a className="item active" title="Database items">
                <i className="large table icon"></i>
            </a>
            <a className="item" title="Query history">
                <i className="large list icon"></i>
            </a>
            <a className="item" title="Variables">
                <i className="large tasks icon"></i>
            </a>
        </div>;
    }
}
