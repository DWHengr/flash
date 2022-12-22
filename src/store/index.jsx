import {createStore, combineReducers} from 'redux';
import * as option from './option/reducer'
let store = createStore(
  combineReducers({...option})
);

export default store;