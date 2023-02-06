import * as type from "./type";
export const setUser = (token, username) => {
  return {
    type: type.Set_Token,
    token: token,
    username: username,
  };
};

export const initUser = () => {
  return {
    type: type.Init_User,
  };
};

export const clearUser = () => {
  return {
    type: type.Clear_User,
  };
};
