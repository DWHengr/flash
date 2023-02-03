import * as type from "./type";

let defaultState = {
  token: "",
  isLogin: false,
};

export const userData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_User:
      let tokenData = localStorage.getItem("token");
      let isLoginData = false;
      if (tokenData) isLoginData = true;
      return { ...state, ...{ token: tokenData, isLogin: isLoginData } };
    case type.Set_Token:
      localStorage.setItem("token", action.token);
      return { ...state, ...action, ...{ isLogin: true } };
    case type.Clear_User:
      localStorage.removeItem("token");
      return { ...state, ...{ token: "", isLogin: false } };
    default:
      return state;
  }
};
