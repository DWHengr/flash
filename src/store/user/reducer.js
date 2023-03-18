import * as type from "./type";

let defaultState = {
  token: "",
  isLogin: false,
  username: "",
  avatar: "",
};

export const userData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_User:
      let tokenData = localStorage.getItem("token");
      let usernameDate = localStorage.getItem("username");
      let avatarDate = localStorage.getItem("avatar");
      let isLoginData = false;
      if (tokenData) isLoginData = true;
      return {
        ...state,
        ...{
          token: tokenData,
          isLogin: isLoginData,
          username: usernameDate,
          avatar: avatarDate,
        },
      };
    case type.Set_Token:
      localStorage.setItem("token", action.token);
      localStorage.setItem("username", action.username);
      localStorage.setItem("avatar", action.avatar);
      return { ...state, ...action, ...{ isLogin: true } };
    case type.Clear_User:
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      return { ...state, ...{ token: "", isLogin: false } };
    default:
      return state;
  }
};
