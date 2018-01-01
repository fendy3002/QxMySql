import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onClick, active} = this.props;
        return <div className="ui left vertical sidebar icon menu pointing overlay visible">
            <a className={"item " + ((active == "db") ? "active" : "")} 
                name="db" onClick={onClick}
                title="Database items">
                <i className="large table icon"></i>
            </a>
            <a className={"item " + ((active == "history") ? "active" : "")} 
                name="history" onClick={onClick}
                title="Query history">
                <i className="large list icon"></i>
            </a>
            <a className={"item " + ((active == "variables") ? "active" : "")} 
                name="variables" onClick={onClick}
                title="Variables">
                <i className="large tasks icon"></i>
            </a>
        </div>;
    }
}
