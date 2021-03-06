import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import 'normalize.css';
import App from './App';
import configureStore from './Store/configureStore';


ReactDOM.render(
    (<Provider store={configureStore} ><App /></Provider>
    ), document.getElementById('root')
);

