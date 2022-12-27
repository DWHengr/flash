import * as type from "./type";

export const initSettingData = (setting) => {
  return {
    type: type.Init_Setting,
    shortcut: setting?.shortcut,
  };
};