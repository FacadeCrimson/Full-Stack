import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, createStore} from 'redux';
import {render} from 'react-dom'
import rootReducer from './reducers/Reducers'

import Auth0Provider from './reducers/authProvider'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}>
                     <Auth0Provider
                    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
                    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
                    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
                    redirectUri={process.env.REACT_APP_AUTH0_CALLBACK_URL}>
                    <App />
                    </Auth0Provider>
                </Provider>, document.getElementById('root'));

defineCustomElements(window);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// const onRedirectCallback = async (appState) => {
//     router.replace({
//         pathname: '/loading',
//         query: { path: appState?.targetUrl },
//         })
// }