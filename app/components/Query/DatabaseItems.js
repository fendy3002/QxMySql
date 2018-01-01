import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let expandIcon = (expanded) => {
    return expanded ? "minus" : "plus";
}

class Tables extends Component {
    constructor(props) {
        super(props);
        this.handleExpand = this.handleExpand.bind(this);
    }
    handleExpand(event){
        let {connection, database, onChange, onGetTables} = this.props;
        let {tables} = database;
        
        tables.expanded = !tables.expanded;
        if(!tables.fetched){
            onGetTables(connection, database.name, (err, result) => {
                tables.fetched = true;
                if(!err){
                    tables.data = result.data.tables;
                }
                else{
                    console.log(err)
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
    render() {
        let {database} = this.props;
        let {tables} = database;

        let getTableRow = (table) => {
            return <div className={"item"} key={database.name + "_table" + "_" + table}>
                <div className="content">
                    <div className="header">
                        <i className={"table icon"}></i>
                        {table}
                    </div>
                </div>
            </div>
        };

        let tableItems = (tables.expanded && tables.data.length > 0) ?
            <div className="list">
                {tables.data.map((table, index) => getTableRow(table))}
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
    }

    handleExpand(index){
        let {onChange} = this.props;
        return (event) => {
            let {databases} = this.props;
            let database = { ...databases[index] };
            
            database.expanded = !database.expanded;
            databases[index] = database;

            onChange({
                target:{
                    name: this.props.name,
                    value: databases
                }
            });
        };
    }

    handleChange(index){
        let {databases, name: propsName, onChange} = this.props;

        return (event) => {
            let {name, value} = event.target;
            databases[index] = {
                ...databases[index],
                [name]: value
            };

            onChange({
                target:{
                    name: propsName,
                    value: databases
                }
            });
        };
    }

    render() {
        let {databases, getTables, openQuery} = this.props;
        let databaseDoms = databases.map((database, index) => {
            return <div className={"item " + ((index == 0) ? "active" : "")} key={database.name}>
                <i className={expandIcon(database.expanded) + " square outline icon"} onClick={this.handleExpand(index)}></i>
                <div className="content">
                    <a className="header">
                        <i className="database icon"></i>
                        {database.name}
                    </a>
                    {database.expanded && <div className="list">
                        <Tables database={database} connection={openQuery.connection} name="tables" 
                            onChange={this.handleChange(index)}
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
