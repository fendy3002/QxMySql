import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ResultPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onChange = () => {};
        let tabHeaders = [
            <a className={"item active" } key="0"
                onClick={() => { }}>
                Result 1
            </a>,
            <a className={"item" } key="1"
                onClick={() => { }}>
                Result 2
            </a>
        ];

        return <div className="result-panel" style={{ width: "100%", height:"100%", position:"absolute" }}>
            <div className="ui top attached tabular menu">
                {tabHeaders}
            </div>
            <div className="ui bottom attached active tab segment" style={{padding: 0}}>
                HELLO
            </div>
        </div>;
    }
}
