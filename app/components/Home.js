// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import ReduxToastr from 'react-redux-toastr'

import ConnectionPage from './ConnectionPage.js';
import StateQueryPage from '../containers/StateQueryPage.js';
import {saveConnections} from '../actions/connection.js';

import { remote } from 'electron';
let {Menu, MenuItem} = remote;

import uiConfig from '../../config/default/ui.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            connections: [],
            openQueries: []
        };

        this.handleChangeConnection = this.handleChangeConnection.bind(this);
        this.handleOpenQueryChange = this.handleOpenQueryChange.bind(this);
        this.handleOpenQuery = this.handleOpenQuery.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);
        this.handleTabContextMenu = this.handleTabContextMenu.bind(this);
    }

    handleTabChange(index){
        this.setState((prevState, props) => {
            return {
                active: index
            };
        });
    }
    handleTabClose(index){
        this.setState((prevState, props) => {
            let {openQueries, active} = prevState;
            let newActive = active;
            if(active == openQueries.length){
                newActive = active - 1;
            }
            else if(active > index + 1){
                newActive = active - 1;
            }

            openQueries.splice(index, 1);
            return {
                active: newActive,
                openQueries: openQueries
            };
        });
    }

    handleTabContextMenu(index){
        let contextMenu = new Menu();
        contextMenu.append(new MenuItem({
            label: 'Close this',
            click: (event) => this.handleTabClose(index)
        }));

        return (event) => {
            event.preventDefault();
            contextMenu.popup(event.clientX, event.clientY);
        };
    }

    handleChangeConnection(event){
        let {saveConnections} = this.props;
        
        let {value} = event.target;
        saveConnections(value);
    }

    handleOpenQuery(connection){
        let {openConnection} = this.props;
        openConnection(connection, (err, response) => {
            if(!err){
                let databases = response.data.databases.map((database, index) => {
                    return {
                        name: database,
                        expanded: false,
                        tables: {
                            fetched: false,
                            expanded: false,
                            data: []
                        },
                        views: {
                            fetched: false,
                            expanded: false,
                            data: []
                        },
                        procedures: {
                            fetched: false,
                            expanded: false,
                            data: []
                        },
                        functions: {
                            fetched: false,
                            expanded: false,
                            data: []
                        }
                    }
                });
                this.setState((prevState, props) => {
                    return {
                        openQueries: prevState.openQueries.concat({
                            connection: connection,
                            databases: databases
                        }),
                        active: prevState.openQueries.length + 1
                    };
                });
            }
        });
    }

    handleOpenQueryChange(event){
        let {value} = event.target;

        this.setState((prevState, props) => {
            let {openQueries, active} = prevState;
            openQueries[active - 1] = value;
            return {
                openQueries: openQueries
            };
        });
    }

    render() {
        let {openQueries, active} = this.state;
        let tabHeaders = [
            <a className={"item wide " + (active == 0 ? "active" : "") } key="0"
                onClick={() => {this.handleTabChange(0)}}>
                <i className="fa fa-wrench"></i>
            </a>
        ].concat(openQueries.map((openQuery, index) => {
            return <a className={"item " + (active == (index + 1) ? "active" : "") } 
                key={index + 1}
                onContextMenu={this.handleTabContextMenu(index)}
                onClick={() => {this.handleTabChange(index + 1)}}>
                {openQuery.connection.name}

                <i className="close icon" 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleTabClose(index);
                        return false;
                    }}>
                </i>
            </a>
        }));

        let page = (active == 0) ?
            <ConnectionPage connections={this.props.request.connections} onOpenConnection={this.handleOpenQuery} onChange={this.handleChangeConnection}/> :
            <StateQueryPage openQuery={openQueries[active - 1]} onChange={this.handleOpenQueryChange}/>;

        return (<div className="main theme black">
            <div className="ui top attached tabular menu">
                {tabHeaders}
            </div>
            <div className="ui bottom attached active tab segment" style={{padding: 0}}>
                {page}
            </div>

            <ReduxToastr 
                position="bottom-right"
                timeOut={4000}/>
        </div>);
    }
}
