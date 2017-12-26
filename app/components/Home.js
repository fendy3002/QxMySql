// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import ConnectModal from './ConnectModal.js';

import uiConfig from '../../config/default/ui.js';

export default class Home extends Component {
  render() {
    return (<div className="root theme black">
        <SplitPane split="vertical" minSize={50} defaultSize={uiConfig.main.top} className="primary">
          <div></div>
          <SplitPane split="horizontal" defaultSize={uiConfig.main.left}>
            <div></div>
            <div></div>
          </SplitPane>
        </SplitPane>

        <ConnectModal />
      </div>);
  }
}
