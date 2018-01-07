import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ResultTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {result} = this.props;
        let headers = result.fields.map((field, index) => {
            return <th>{field}</th>
        });

        let body = result.data.map((each, index) => {
            let fieldDoms = result.fields.map((field, index) => {
                return <td key={index}>{each[field]}</td>;
            });
            return <tr>
                {fieldDoms}
            </tr>
        });

        return <table className="ui compact small inverted celled table">
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>;
    }
}
