// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Sidebar from './Query/Sidebar.js';
import DatabaseItems from './Query/DatabaseItems.js';

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {openQuery} = this.props;
        return <div className="pushable" style={{height:"100%", width: "100%", position:"absolute"}}>
            <Sidebar />
            <div className="pusher" style={{ marginLeft: "64px", padding: "0" }}>
                <SplitPane split="vertical" minSize={240}>
                    <DatabaseItems databases={openQuery.databases} />
                    <SplitPane split="horizontal">
                        <div>SDFA</div>
                        <div>ZXCV</div>
                    </SplitPane>
                </SplitPane>
            </div>
        </div>;
    }
}
