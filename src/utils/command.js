import { invoke } from "@tauri-apps/api/tauri";

export function updateConfig(optionData, settingData) {
  return invoke("update_config", {
    config: {
      setting: {
        shortcut: settingData.shortcut,
        search_text: settingData.search_text,
      },
      option: optionData.allDataList,
    },
  });
}
