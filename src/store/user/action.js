import * as type from "./type";
export const setToken = (token) => {
  return {
    type: type.Set_Token,
    token: token,
  };
};

export const InitUser = () => {
  return {
    type: type.Set_Token,
  };
};
