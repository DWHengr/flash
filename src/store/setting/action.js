import * as type from "./type";

export const initSettingData = (setting) => {
  return {
    type: type.Init_Setting,
    shortcut: setting?.shortcut,
    search_text: setting?.search_text,
  };
};

export const setSearchTxt = (txt) => {
  return {
    type: type.Set_Search_Txt,
    search_text: txt,
  };
};

export const setShortcutCmd = (txt) => {
  return {
    type: type.Set_Shortcut,
    shortcut: txt,
  };
};
