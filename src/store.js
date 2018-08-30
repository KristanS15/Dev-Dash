import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware( promise(), thunkMiddleware, createLogger() );

export default createStore( reducer, middleware );