import {applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk'
import reducers from './reducer'
import {middleware} from './navigator'
import Api from "./middleware/api";

const middlewares = [
    thunk,
    Api,
    middleware
];

/**
 * 创建store
 */
export default createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));