import * as type from "./type";

export const initSettingData = (setting) => {
  return {
    type: type.Init_Setting,
    shortcut: setting?.shortcut,
    search_text: setting?.search_text,
    search_engine: setting?.search_engine,
    window_size: setting?.window_size,
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

export const setSearchEngineTxt = (SearchEnginet) => {
  return {
    type: type.Set_Search_Engine,
    search_engine: SearchEnginet,
  };
};

export const setWindowSizeContent = (windowSize) => {
  return {
    type: type.Set_Window_Size,
    window_size: windowSize,
  };
};
