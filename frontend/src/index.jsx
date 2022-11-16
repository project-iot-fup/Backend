import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Base from './layouts/Base';
import reportWebVitals from './reportWebVitals';
import './global.css';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Base />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
