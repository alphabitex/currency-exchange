import React, { Component, PropTypes } from 'react';

import BitcoinInput from './components/BitcoinInput';
import Currencies from './components/Currencies';
import TimeTravel from './components/TimeTravel';

const { func, node } = PropTypes;

class App extends Component {
    static displayName = 'App'

    static propTypes = {
        children: node,
        updateData: func
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.props.updateData();
        }, 15000);
    }

    render = () => (
        <div className="app">
            <TimeTravel />
            <BitcoinInput />
            <Currencies />
        </div>
    )
}

export default App;
