// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Sidebar from './Query/Sidebar.js';
import DatabaseItems from './Query/DatabaseItems.js';
import EditorPages from './Query/EditorPages.js';
import ResultPanel from './Query/ResultPanel.js';

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        let {name, value} = event.target;
        let {onChange} = this.props;
        
        onChange({
            target: {
                name: this.props.name,
                value: {
                    ...this.props.openQuery,
                    [name] : value
                }
            }
        })
    }

    render() {
        let {connection, openQuery, getTables} = this.props;
        return <div className="pushable" style={{height:"100%", width: "100%", position:"absolute"}}>
            <Sidebar />
            <div className="pusher" style={{ marginLeft: "64px", padding: "0" }}>
                <SplitPane split="vertical" minSize={120} defaultSize={240}>
                    <DatabaseItems openQuery={openQuery} databases={openQuery.databases} onChange={this.handleChange} name="databases" 
                        getTables={getTables}/>
                    <SplitPane split="horizontal" minSize={150} defaultSize={400}>
                        <EditorPages openQuery={openQuery} />
                        <ResultPanel />
                    </SplitPane>
                </SplitPane>
            </div>
        </div>;
    }
}
