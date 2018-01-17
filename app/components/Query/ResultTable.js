import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Column, Cell } from 'fixed-data-table-2';

class TextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        return (
        <Cell {...props}>
            {data[rowIndex][columnKey]}
        </Cell>
        );
    }
};

export default class ResultTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {result} = this.props;
        let headers = result.fields.map((field, index) => {
            return <th>{field}</th>
        });

        let body = result.data.map((each, index) => {
            let fieldDoms = result.fields.map((field, index) => {
                return <td key={index}>{each[field]}</td>;
            });
            return <tr>
                {fieldDoms}
            </tr>
        });

        // return <table className="ui compact small inverted celled table">
        //     <thead>
        //         <tr>
        //             {headers}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {body}
        //     </tbody>
        // </table>;

        return <Table
            rowHeight={20}
            headerHeight={20}
            height={500}
            width={600}
            rowsCount={result.data.length}>
            {result.fields.map((each, index) => {
                return <Column
                    columnKey={each}
                    header={<Cell>{each}</Cell>}
                    cell={<TextCell data={result.data} />}
                    fixed={true}
                    width={50}
                />
            })}
        </Table>;
    }
}