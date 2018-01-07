import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable.js';

export default class ResultPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleTabChange(index){
        let {query, onChange} = this.props;
        
        onChange({
            target:{
                name: this.props.name,
                value: {
                    ...query,
                    activeResult: index
                }
            }
        });
    }

    render() {
        let {query} = this.props;
        if(!query.results || query.results.length == 0){
            return null;
        }
        else{
            let activeResult = query.results[query.activeResult];
            let tabHeaders = query.results.map((result, index) => {
                return <a className={"item " + (query.activeResult == index ? "active" : "") } key={index}
                    onClick={() => this.handleTabChange(index)}>
                    {index}
                </a>;
            });
            
            return <div className="result-panel" style={{ width: "100%", height:"100%", position:"absolute" }}>
                <div className="ui top attached tabular menu">
                    {tabHeaders}
                </div>
                <div className="ui bottom attached active tab segment" style={{padding: 0}}>
                    <ResultTable result={activeResult} />
                </div>
            </div>;
        }
    }
}
