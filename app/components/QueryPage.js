// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Sidebar from './Query/Sidebar.js';
import DatabaseItems from './Query/DatabaseItems.js';
import SystemVariables from './Query/SystemVariables.js';
import EditorPages from './Query/EditorPages.js';
import ResultPanel from './Query/ResultPanel.js';

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSidebar: "db",
            activeDatabase: "",
            activeQuery: 0,
            variables: {
                fetched: false,
                data: []
            },
            histories: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSidebar = this.handleSidebar.bind(this);        
    }

    handleChange(event){
        let {name, value} = event.target;
        let {onChange} = this.props;
        
        onChange({
            target: {
                name: this.props.name,
                value: {
                    ...this.props.openQuery,
                    ...value
                }
            }
        })
    }

    handleSidebar(event){
        let {getSystemVariables, openQuery} = this.props;
        let {connection} = openQuery;
        let {name} = event.currentTarget;

        if(name == "db"){
            this.setState((prevState, props) => {
                return {
                    activeSidebar: name
                };
            });
        }
        else if(name == "history"){
            this.setState((prevState, props) => {
                return {
                    activeSidebar: name
                };
            });
        }
        else if(name == "variables"){
            if(this.state.variables.fetched){
                this.setState((prevState, props) => {
                    return {
                        activeSidebar: name
                    };
                });
            }
            else{
                getSystemVariables(connection, null, (err, res) => {
                    if(!err){
                        this.setState((prevState, props) => {
                            console.log("res.data", res.data);
                            let variables = res.data.variables.map((each, index) => {
                                return {
                                    name: each.Variable_name,
                                    value: each.Value
                                };
                            });

                            return {
                                activeSidebar: name,
                                variables: {
                                    fetched: true,
                                    data: variables
                                }
                            };
                        });
                    }
                    else{
                        this.setState((prevState, props) => {
                            return {
                                activeSidebar: name,
                                variables: {
                                    fetched: true,
                                    data: []
                                }
                            };
                        });
                    }
                })
            }
        }
    }

    render() {
        let {connection, openQuery, getTable, getTables, getExecute} = this.props;
        let {activeSidebar, activeDatabase, activeQuery, variables} = this.state;

        let sidebarPanel = null;
        if(activeSidebar == "db"){
            sidebarPanel = <DatabaseItems openQuery={openQuery} databases={openQuery.databases} onChange={this.handleChange} name="databases" 
                getTable={getTable} getTables={getTables}/>;
        }
        else if(activeSidebar == "history"){
            sidebarPanel = <div></div>;
        }
        else if(activeSidebar == "variables"){
            sidebarPanel = <SystemVariables variables={variables.data}/>;
        }

        return <div className="pushable" style={{height:"100%", width: "100%", position:"absolute"}}>
            <Sidebar active={activeSidebar} onClick={this.handleSidebar}/>
            <div className="pusher" style={{ marginLeft: "64px", padding: "0" }}>
                <SplitPane split="vertical" minSize={120} defaultSize={240}>
                    {sidebarPanel}
                    <SplitPane split="horizontal" minSize={150} defaultSize={400}>
                        <EditorPages openQuery={openQuery} onExecute={getExecute} onChange={this.handleChange} />
                        <ResultPanel />
                    </SplitPane>
                </SplitPane>
            </div>
        </div>;
    }
}
