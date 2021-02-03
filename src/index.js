import "./index.css";
import React, { useState } from "react";
import { render } from "react-dom";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());


const app = (<Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>);



render(app, document.getElementById("root"));