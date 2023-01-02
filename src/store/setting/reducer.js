import * as type from "./type";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
let defaultState = {
  shortcut: "",
  search_text: "",
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

export const settingData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Setting:
      unregisterAll();
      registerShortCut(action.shortcut);
      return { ...state, ...action };
    case type.Set_Search_Txt:
      return { ...state, ...{ search_text: action.search_text } };
    case type.Set_Shortcut:
      console.log(action.shortcut)
      unregisterAll();
      registerShortCut(action.shortcut);
      return { ...state, ...{ shortcut: action.shortcut } };
    default:
      return state;
  }
};
