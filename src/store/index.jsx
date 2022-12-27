import {createStore, combineReducers} from 'redux';
import * as option from './option/reducer'
import * as setting from './setting/reducer'
let store = createStore(
  combineReducers({...option,...setting})
);

export default store;