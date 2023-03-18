import * as type from "./type";
export const setUser = (token, username, avatar) => {
  return {
    type: type.Set_Token,
    token: token,
    username: username,
    avatar: avatar,
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
