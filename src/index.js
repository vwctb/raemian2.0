import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/configureStore';

import * as proxyServer from 'lib/proxyServer';

//import socket from 'lib/socket';

const store = configureStore();
const proxy = proxyServer.getProxyServer();
const socketURITalk = 'ws://'+proxy+':4805';
const socketURIControl = 'ws://'+proxy+':4804';
     // socket.initialize(store, socketURI);
const render = Component => {
    window.store = store;
    window.socketURITalk = socketURITalk;
    window.socketURIControl = socketURIControl;
    ReactDOM.render(
        <AppContainer>
            <Component store={window.store}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);

if(module.hot) {
    module.hot.accept('./Root', () => render(Root));
}



registerServiceWorker();