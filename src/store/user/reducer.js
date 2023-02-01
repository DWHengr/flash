import * as type from "./type";

let defaultState = {
  token: "",
};

export const userData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_User:
      let tokenData = localStorage.getItem("token");
      return { ...state, ...{ shortcut: tokenData } };
    case type.Set_Token:
      localStorage.setItem("token", action.token);
      return { ...state, ...action };
    default:
      return state;
  }
};
