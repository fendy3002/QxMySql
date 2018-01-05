import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { remote } from 'electron';
let {Menu, MenuItem} = remote;
import copy from 'copy-to-clipboard';

let expandIcon = (expanded) => {
    return expanded ? "minus" : "plus";
}

export default class TableRow extends Component {
    constructor(props) {
        super(props);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    handleExpand(event){
        
    }

    handleContextMenu(table, index){
        let getContextMenu = (table) => {
            let contextMenu = new Menu();
            contextMenu.append(new MenuItem({
                label: 'Copy select statement',
                click: (event) => {
                    copy(table.selectStatement)
                }
            }));
            contextMenu.append(new MenuItem({
                label: 'Copy create statement',
                click: (event) => {
                    copy(table.createStatement)
                }
            }));
            return contextMenu;
        };

        return (event) => {
            if(!table.fetched){
                let location = {
                    x: event.clientX, 
                    y: event.clientY
                };

                let {connection, database, onChange, onGetTable} = this.props;
                onGetTable(connection, database.name, table.name, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        let tables = database.tables;
                        tables.data[index] = {
                            ...table,
                            ...result.data.table,
                            fetched: true
                        };

                        onChange({
                            target:{
                                name: this.props.name,
                                value: tables
                            }
                        });

                        getContextMenu(result.data.table).popup(location.x, location.y);
                    }
                })
            }
            else{
                getContextMenu(table).popup(location.x, location.y);
            }

            event.preventDefault();
        };
    }

    render() {
        let {database, table, index} = this.props;

        return <div className={"item"} key={database.name + "_table" + "_" + table.name}>
            <div className="content" onContextMenu={this.handleContextMenu(table, index)}>
                <div className="header">
                    <i className={"table icon"}></i>
                    {table.name}
                </div>
            </div>
        </div>;
    }
}