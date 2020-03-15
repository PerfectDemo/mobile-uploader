require('babel-polyfill');

import React from 'react';
import ReactDom from 'react-dom';

import { Provider as ContextProvider } from './src/context';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './src/app';

const root = document.getElementById('root');

ReactDom.render(
    <div>
        <CssBaseline />
        <ContextProvider>
            <App />
        </ContextProvider>
    </div>, root);