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
        let {database, onChange} = this.props;
        let {tables} = database;
        
        tables.expanded = !tables.expanded;
        onChange({
            target:{
                name: this.props.name,
                value: tables
            }
        });
    }
    render() {
        let {database} = this.props;
        return <div className={"item"} key={database.name + "_table"}>
            <i className={expandIcon(database.tables.expanded) + " square outline icon"} 
                onClick={this.handleExpand}></i>
            <div className="content">
                <div className="header">
                    <i className={"table icon"}></i> Tables
                </div>
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
        let {databases} = this.props;
        let databaseDoms = databases.map((database, index) => {
            return <div className={"item " + ((index == 0) ? "active" : "")} key={database.name}>
                <i className={expandIcon(database.expanded) + " square outline icon"} onClick={this.handleExpand(index)}></i>
                <div className="content">
                    <a className="header">
                        <i className="database icon"></i>
                        {database.name}
                    </a>
                    {database.expanded && <div className="list">
                        <Tables database={database} name="tables" onChange={this.handleChange(index)}/>
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
