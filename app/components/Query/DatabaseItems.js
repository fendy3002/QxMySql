import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableRow from './TableRow.js';

import { remote } from 'electron';
let {Menu, MenuItem} = remote;
import copy from 'copy-to-clipboard';

let expandIcon = (expanded) => {
    return expanded ? "minus" : "plus";
}

class Tables extends Component {
    constructor(props) {
        super(props);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    handleExpand(event){
        let {connection, database, onChange, onGetTables} = this.props;
        let {tables} = database;
        
        tables.expanded = !tables.expanded;
        if(!tables.fetched){
            onGetTables(connection, database.name, (err, result) => {
                tables.fetched = true;
                if(!err){
                    tables.data = result.data.tables.map((table, index) => {
                        return {
                            name: table,
                            fetched: false,
                            expanded: false
                        };
                    });
                }
                else{
                    console.log(err);
                }
                onChange({
                    target:{
                        name: this.props.name,
                        value: tables
                    }
                });
            });
        }
        else{
            onChange({
                target:{
                    name: this.props.name,
                    value: tables
                }
            });
        }
    }

    handleContextMenu(){
        return (event) => {
            event.preventDefault();
        };
    }

    render() {
        let {database, connection, onChange, onGetTable} = this.props;
        let {tables} = database;

        let tableItems = (tables.expanded && tables.data.length > 0) ?
            <div className="list">
                {tables.data.map((table, index) => 
                    <TableRow database={database} connection={connection} 
                        table={table} onGetTable={onGetTable} index={index} key={index} 
                        onChange={onChange}/>
                )}
            </div> :
            null;
            
        return <div className={"item"} key={database.name + "_table"}>
            <i className={expandIcon(database.tables.expanded) + " square outline icon"} 
                onClick={this.handleExpand}></i>
            <div className="content">
                <div className="header">
                    <i className={"table icon"}></i> Tables
                </div>
                {tableItems}
            </div>
        </div>;
    }
}

export default class DatabaseItems extends Component {
    constructor(props) {
        super(props);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetActive = this.handleSetActive.bind(this);
    }

    handleExpand(index){
        let {openQuery, onChange} = this.props;
        return (event) => {
            let {databases} = this.props;
            let database = { ...databases[index] };
            
            database.expanded = !database.expanded;
            databases[index] = database;

            onChange({
                target:{
                    name: this.props.name,
                    value: {
                        ...openQuery,
                        databases: databases
                    }
                }
            });
        };
    }

    handleChange(index){
        let {openQuery, databases, name: propsName, onChange} = this.props;

        return (event) => {
            let {name, value} = event.target;
            databases[index] = {
                ...databases[index],
                [name]: value
            };

            onChange({
                target:{
                    name: propsName,
                    value: {
                        ...openQuery,
                        databases: databases
                    }
                }
            });
        };
    }

    handleSetActive(database){
        let {openQuery, onChange} = this.props;

        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...openQuery,
                    activeDatabase: database
                }
            }
        });
    }

    render() {
        let {databases, getTable, getTables, openQuery} = this.props;
        let databaseDoms = databases.map((database, index) => {
            return <div className={"item " + (database.name == openQuery.activeDatabase ? "active" : "")} 
                key={database.name}>
                <i className={expandIcon(database.expanded) + " square outline icon"} onClick={this.handleExpand(index)}></i>
                <div className="content">
                    <a className="header" onDoubleClick={() => this.handleSetActive(database.name)}>
                        <i className="database icon"></i>
                        {database.name}
                    </a>
                    {database.expanded && <div className="list">
                        <Tables database={database} connection={openQuery.connection} name="tables" 
                            onChange={this.handleChange(index)}
                            onGetTable={getTable}
                            onGetTables={getTables}/>
                        <div className={"item"} key={database.name + "_view"}>
                            <i className={"folder icon"}></i>
                            <div className="content">
                                <div className="header">Views</div>
                            </div>
                        </div>
                        <div className={"item"} key={database.name + "_procedure"}>
                            <i className={"folder icon"}></i>
                            <div className="content">
                                <div className="header">Procedures</div>
                            </div>
                        </div>
                        <div className={"item"} key={database.name + "_functions"}>
                            <i className={"folder icon"}></i>
                            <div className="content">
                                <div className="header">Functions</div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>;
        });
        return <div className="" style={{ padding: "8px 6px" }}>
            <div className="ui list">
                {databaseDoms}
            </div>
        </div>;
    }
}
