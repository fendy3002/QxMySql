// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Sidebar from './Query/Sidebar.js';
import DatabaseItems from './Query/DatabaseItems.js';
import Editor from './Query/Editor.js';
import ResultPanel from './Query/ResultPanel.js';

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {openQuery} = this.props;
        return <div className="pushable" style={{height:"100%", width: "100%", position:"absolute"}}>
            <Sidebar />
            <div className="pusher" style={{ marginLeft: "64px", padding: "0" }}>
                <SplitPane split="vertical" minSize={120} defaultSize={240}>
                    <DatabaseItems databases={openQuery.databases} />
                    <SplitPane split="horizontal" minSize={150} defaultSize={400}>
                        <Editor />
                        <ResultPanel />
                    </SplitPane>
                </SplitPane>
            </div>
        </div>;
    }
}
