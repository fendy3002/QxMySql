import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';

import Editor from './Editor.js';
import { relative } from 'path';
import ResultPanel from './ResultPanel.js';
import model from '../../helpers/model.js';

export default class EditorPages extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleTabAdd = this.handleTabAdd.bind(this);
        this.handleTabRemove = this.handleTabRemove.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
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

    handleTabAdd(){
        let {openQuery, onChange} = this.props;
        let queries = openQuery.queries.concat(
            model.queryPage("Query " + (openQuery.queries.length + 1))
        );
        let newActiveQuery = openQuery.queries.length;
        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...openQuery,
                    queries: queries,
                    activeQuery: newActiveQuery
                }
            }
        });
    }

    handleTabChange(index){
        let {openQuery, onChange} = this.props;
        
        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...openQuery,
                    activeQuery: index
                }
            }
        });
    }

    handleTabRemove(index){
        let {openQuery, onChange} = this.props;

        let queries = openQuery.queries;

        let newActiveQuery = openQuery.activeQuery;
        if(index == openQuery.activeQuery &&
            index == (openQuery.queries.length - 1)){
            newActiveQuery -= 1;
        }
        else if(index < openQuery.activeQuery){
            newActiveQuery -= 1;
        }
        
        queries.splice(index, 1);

        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...openQuery,
                    activeQuery: newActiveQuery,
                    queries: queries
                }
            }
        });
    }

    handleExecute(queryPage){
        let {openQuery, onExecute, onChange} = this.props;

        let {connection, activeDatabase} = openQuery;
        let queryText = queryPage.query;

        onExecute(connection, activeDatabase, queryText, (err, results) => {
            if(!err){
                let queries = openQuery.queries;
                queries[openQuery.activeQuery] = {
                    ...queryPage,
                    results: results.data.results,
                    activeResult: 0
                };
                onChange({
                    target:{
                        name: this.props.name,
                        value: {
                            ...openQuery,
                            queries: queries
                        }
                    }}
                );
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
                        this.handleTabRemove(index);
                        return false;
                    }}>
                </i>
            </a>
        }).concat(
            <a className={"item"} key={openQuery.queries.length}
                onClick={this.handleTabAdd}>
                <i className="add icon"></i>
            </a>
        );

        let activeQuery = openQuery.queries[openQuery.activeQuery];
        return <SplitPane split="horizontal" minSize={150} defaultSize={400}>
            <div className="" style={{ width: "100%", height:"100%", position:"absolute" }}>
                <div style={{position:"relative", height:"100%", display: "flex", flexFlow: "column"}}>
                    <div className="ui top attached tabular menu" style={{ flex: "0 1 auto" }}>
                        {tabHeaders}
                    </div>
                    <div className="ui bottom attached active tab segment" style={{padding: 0, flex:"1 1 auto"}}>
                        {activeQuery && 
                            <Editor query={activeQuery} onExecute={this.handleExecute} onChange={this.handleChange} />
                        }
                    </div>
                </div>
            </div>
            <ResultPanel query={activeQuery} onChange={this.handleChange} />
        </SplitPane>;
    }
}
