import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/twilight';

export default class Editor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onChange = () => {};
        return <div>
            <AceEditor
                mode="mysql"
                theme="twilight"
                width="100%"
                height="100%"
                onChange={onChange}
                style={{ position: "absolute" }}
                fontSize={16}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
            />
        </div>;
    }
}
