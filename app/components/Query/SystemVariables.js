import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SystemVariables extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {variables} = this.props;

        let variableDoms = variables.map((variable, index) => {
            return <tr key={index}>
                <td>
                    {variable.name}
                </td>
                <td>
                    {variable.value}
                </td>
            </tr>;
        });
        return <div className="" style={{ padding: "0 0 0 0", 
                margin: "0 9px 0 0",
                overflow:"auto", height: "100%"}}>
            <table className="ui compact small inverted celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {variableDoms}
                </tbody>
            </table>
        </div>;
    }
}
