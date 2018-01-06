import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor.js';
import { relative } from 'path';

export default class EditorPages extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        let {openQuery, onChange} = this.props;
        let {value} = event.target;
        
        let queries = openQuery.queries;
        queries[openQuery.activeQuery] = value;
        onChange({
            target:{
                name: this.props.name,
                value: queries
            }
        });
    }

    render() {
        let {openQuery} = this.props;
        let tabHeaders = openQuery.queries.map((query, index) => {
            return <a className={"item " + (openQuery.activeQuery == index ? "active" : "") } key={index}
                onClick={() => {this.handleTabChange(index)}}>
                {query.title}

                <i className="close icon" 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleTabClose(index);
                        return false;
                    }}>
                </i>
            </a>
        });

        let activeQuery = openQuery.queries[openQuery.activeQuery];
        return <div className="" style={{ width: "100%", height:"100%", position:"absolute" }}>
            <div style={{position:"relative", height:"100%", display: "flex", flexFlow: "column"}}>
                <div className="ui top attached tabular menu" style={{ flex: "0 1 auto" }}>
                    {tabHeaders}
                </div>
                <div className="ui bottom attached active tab segment" style={{padding: 0, flex:"1 1 auto"}}>
                    <Editor query={activeQuery} onChange={this.handleChange} />
                </div>
            </div>
        </div>
    }
}
