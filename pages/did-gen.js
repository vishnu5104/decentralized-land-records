import React from 'react';

import { HelloWorld } from '../components/HelloWorld';

import { useState } from 'react';
// import './App.css';
import { Loader } from '../components';
import getStorageProvider, { getWalletInstance } from '../utils/storageProvider';

class App extends React.Component {
    state = {
        loggedIn: false,
    };

    async componentDidMount() {
        const provider = await getWalletInstance();
        provider.on('connect', async () => {
            const sp = await getStorageProvider(provider);
            await sp.login();
            this.setState({
                loggedIn: true,
            });
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return <Loader />;
        }

        return <HelloWorld />;
    }
}

export default App;
