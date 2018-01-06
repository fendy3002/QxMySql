import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import { remote } from 'electron';
let {Menu, MenuItem} = remote;

import 'brace/mode/mysql';
import 'brace/theme/twilight';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    handleQueryChange(newValue){
        let {query, onChange} = this.props;
        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...query,
                    query: newValue
                }
            }
        });
    }

    handleContextMenu() {
        let inputMenu = new Menu();
        let contextMenu = new Menu();

        let executeMenu = {
            label: 'Execute',
            click: () => {
                console.log("Executed")
            }
        };

        [executeMenu, {
            type: 'separator',
        }, {
            label: 'Cut',
            role: 'cut',
        }, {
            label: 'Copy',
            role: 'copy',
        }, {
            label: 'Paste',
            role: 'paste',
        }, {
            type: 'separator',
        }, {
            label: 'Select all',
            role: 'selectall',
        }].forEach((obj, index) => {
            inputMenu.append(new MenuItem(obj));
        });

        [executeMenu].forEach((obj, index) => {
            contextMenu.append(new MenuItem(obj));
        })
        
        return (event) => {
            let location = {
                x: event.clientX, 
                y: event.clientY
            };

            if(event.target.tagName.toUpperCase() == "TEXTAREA"){
                inputMenu.popup(location.x, location.y);
            }
            else{
                contextMenu.popup(location.x, location.y);
            }
            event.preventDefault();
        };
    }

    render() {
        let {query} = this.props;

        return <div onContextMenu={this.handleContextMenu()}>
            <AceEditor
                mode="mysql"
                theme="twilight"
                width="100%"
                height="100%"
                
                value={query.query}
                onChange={this.handleQueryChange}
                style={{ position: "absolute" }}
                fontSize={16}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
            />
        </div>;
    }
}
