import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './Reducers/AppContent'
import userReducer from './Reducers/User'
import {getDataFromMongo} from './Middlewares/Crud'

const reducer = combineReducers({ appReducer, userReducer });

const store = createStore(reducer, applyMiddleware(getDataFromMongo));
window.store = store;
export default store;
