import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';

import { remote } from 'electron';
let {Menu, MenuItem} = remote;
import Mousetrap from 'mousetrap';

import Editor from './Editor.js';
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
        this.handleTabContextMenu = this.handleTabContextMenu.bind(this);
        this.handleTabMove = this.handleTabMove.bind(this);
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

    handleTabContextMenu(index){
        let contextMenu = new Menu();
        contextMenu.append(new MenuItem({
            label: 'Close this',
            click: (event) => this.handleTabRemove(index)
        }));

        return (event) => {
            event.preventDefault();
            contextMenu.popup(event.clientX, event.clientY);
        };
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
        let moveIndex = index;
        
        if(index < 0){ moveIndex = openQuery.queries.length - 1; }
        if(index > openQuery.queries.length - 1){ moveIndex = 0; }

        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...openQuery,
                    activeQuery: moveIndex
                }
            }
        });
    }

    handleTabMove(pos){
        let {openQuery, onChange} = this.props;
        this.handleTabChange(openQuery.activeQuery + pos);
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

    componentDidMount(){
        let {server} = this.props;
        let keyConfigs = server.keyboard
            .filter((key) => key.when({ inQueriesPage: true }));
        
        let commandMap = {
            "editorPage.tabNext": () => this.handleTabMove(1),
            "editorPage.tabPrev": () => this.handleTabMove(-1),
            "editorPage.removeTab": () => this.handleTabRemove(this.props.openQuery.activeQuery),

            "editorPage.tabMove1": () => this.handleTabChange(0),
            "editorPage.tabMove2": () => this.handleTabChange(1),
            "editorPage.tabMove3": () => this.handleTabChange(Math.min(2, this.props.openQuery.queries.length - 1)),
            "editorPage.tabMove4": () => this.handleTabChange(Math.min(3, this.props.openQuery.queries.length - 1)),
            "editorPage.tabMove5": () => this.handleTabChange(Math.min(4, this.props.openQuery.queries.length - 1))
        };

        keyConfigs.forEach((key, index) => {
            Mousetrap(this.div).bind(key.key, () => {
                let command = commandMap[key.command];
                if(command){ command(); }
            });
        });
    }

    render() {
        let {openQuery, server} = this.props;
        let tabHeaders = openQuery.queries.map((query, index) => {
            return <a className={"item " + (openQuery.activeQuery == index ? "active" : "") } key={index}
                onClick={() => {this.handleTabChange(index)}}
                onContextMenu={this.handleTabContextMenu(index)}>
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
            <div className="" style={{ width: "100%", height:"100%", position:"absolute" }} ref={(n) => this.div = n } tabIndex="1">
                <div style={{position:"relative", height:"100%", display: "flex", flexFlow: "column"}}>
                    <div className="ui top attached tabular menu" style={{ flex: "0 1 auto" }}>
                        {tabHeaders}
                    </div>
                    <div className="ui bottom attached active tab segment" style={{padding: 0, flex:"1 1 auto"}}>
                        {activeQuery && 
                            <Editor server={server} query={activeQuery} onExecute={this.handleExecute} onChange={this.handleChange} onTabMove={this.handleTabMove} />
                        }
                    </div>
                </div>
            </div>
            <div>
                {activeQuery && 
                    <ResultPanel query={activeQuery} onChange={this.handleChange} />
                }
            </div>
       </SplitPane>;
    }
}
