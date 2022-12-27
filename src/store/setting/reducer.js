import * as type from "./type";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
let defaultState = {
  shortcut: "",
};

const registerShortCut = async (shortcut) => {
  await register(shortcut, async () => {
    let isVisible = await appWindow.isVisible();
    if (isVisible) {
      appWindow.hide();
    } else {
      appWindow.show();
      appWindow.setFocus();
    }
  });
};

export const settingData = async (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Setting:
      await unregisterAll();
      await registerShortCut(action.shortcut);
      return { ...state, ...action };
    default:
      return state;
  }
};
