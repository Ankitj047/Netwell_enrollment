import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './Store';
import i18n from './i18next';
// import 'core-js/fn/number/is-nan';
import 'core-js';
// import 'core-js/es/array'; 
import 'babel-polyfill';

import 'raf/polyfill';
import {Provider} from 'react-redux';

ReactDOM.render(<Provider store={Store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
