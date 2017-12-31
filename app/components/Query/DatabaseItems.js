import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DatabaseItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {databases} = this.props;
        let databaseDoms = databases.map((database, index) => {
            return <a className={"item " + ((index == 0) ? "active" : "")}>
                <i className="plus square outline icon"></i>
                <i className="database icon"></i>
                <div className="content">
                    <div className="header">{database}</div>
                    {/* <div class="list">
                        
                    </div> */}
                </div>
            </a>;
        });
        return <div className="" style={{ padding: "8px 6px" }}>
            <div className="ui list">
                {databaseDoms}
            </div>
        </div>;
    }
}
