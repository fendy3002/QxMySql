import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import { remote } from 'electron';
import lo from 'lodash';
import Mousetrap from 'mousetrap';

let {Menu, MenuItem} = remote;

import 'brace/mode/mysql';
import 'brace/theme/twilight';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            div: null
        };

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
        let {query: queryPage, onExecute} = this.props;
        let inputMenu = new Menu();
        let contextMenu = new Menu();

        let executeMenu = {
            label: 'Execute',
            click: () => {
                onExecute(queryPage);
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

    componentDidMount(){
        let {query, server, onExecute} = this.props;
        console.log(this.div);
        let keyConfigs = server.keyboard
            .filter((key) => key.when({ inQueryEditor: true }) && key.command == "execute");
        console.log(keyConfigs);
        keyConfigs.forEach((key, index) => {
            console.log("key", key);
            Mousetrap(this.div).bind(key.key, () => {
                console.log("A"); onExecute(query)
            });
        });
    }

    render() {
        let {query, server, onExecute} = this.props;

        return <div onContextMenu={this.handleContextMenu()} ref={(n) => this.div = n }>
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
