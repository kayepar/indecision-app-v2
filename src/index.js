import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import OptionsProvider from '../src/context/optionsContext';
import IndecisionApp from './components/IndecisionApp';

//! This branch serves as a copy of the app with Context API

ReactDOM.render(
    <React.StrictMode>
        <OptionsProvider>
            <IndecisionApp />
        </OptionsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
