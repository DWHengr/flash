import { createStore, combineReducers } from "redux";
import * as option from "./option/reducer";
import * as setting from "./setting/reducer";
import * as user from "./user/reducer";
import * as search from "./search/reducer";
let store = createStore(
  combineReducers({ ...option, ...setting, ...user, ...search })
);

export default store;
