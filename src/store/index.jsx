import { createStore, combineReducers } from "redux";
import * as option from "./option/reducer";
import * as setting from "./setting/reducer";
import * as user from "./user/reducer";
let store = createStore(combineReducers({ ...option, ...setting, ...user }));

export default store;
