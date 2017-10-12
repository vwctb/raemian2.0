import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { AppContainer } from 'react-hot-loader';
import configureStore from 'redux/configureStore';
import socket from 'lib/socket';

const store = configureStore();
const socketURI = process.env.NODE_ENV === 'production' 
                    ? ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws"
                    : 'ws://122.199.242.18:4804';
      socket.initialize(store, socketURI);


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);

if(module.hot) {
    module.hot.accept('./Root', () => render(Root));
}

registerServiceWorker();