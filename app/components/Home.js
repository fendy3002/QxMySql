// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';

export default class Home extends Component {
  render() {
    return (<div className="root theme black">
        <SplitPane split="vertical" minSize={50} defaultSize={100} className="primary">
          <div></div>
          <SplitPane split="horizontal">
            <div></div>
            <div></div>
          </SplitPane>
        </SplitPane>
      </div>);
  }
}
