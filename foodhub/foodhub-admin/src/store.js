// src/store.js (Ensure you have middleware)
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // For Redux DevTools

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
