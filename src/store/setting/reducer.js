import * as type from "./type";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
let defaultState = {
  shortcut: "",
  search_text: "",
  search_engine: "",
  windowHeight: 410,
  windowWidth: 600,
};

const registerShortCut = (shortcut) => {
  register(shortcut, async () => {
    let isVisible = await appWindow.isVisible();
    if (isVisible) {
      appWindow.hide();
    } else {
      appWindow.show();
      appWindow.setFocus();
    }
  });
};

const getWidthHeight = (windowSize) => {
  let height = 410;
  let width = 600;
  switch (windowSize) {
    case "700x500":
      height = 500;
      width = 700;
      break;
  }
  appWindow.setSize(new LogicalSize(width, 60));
  return {
    height,
    width,
  };
};

export const settingData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Setting:
      unregisterAll();
      registerShortCut(action.shortcut);
      let widthHeight = getWidthHeight(action.window_size);
      return {
        ...state,
        ...action,
        windowHeight: widthHeight.height,
        windowWidth: widthHeight.width,
      };
    case type.Set_Search_Txt:
      return { ...state, ...{ search_text: action.search_text } };
    case type.Set_Search_Engine:
      return { ...state, ...{ search_engine: action.search_engine } };
    case type.Set_Shortcut:
      unregisterAll();
      registerShortCut(action.shortcut);
      return { ...state, ...{ shortcut: action.shortcut } };
    case type.Set_Window_Size:
      widthHeight = getWidthHeight(action.window_size);
      return {
        ...state,
        windowHeight: widthHeight.height,
        windowWidth: widthHeight.width,
      };
    default:
      return state;
  }
};
