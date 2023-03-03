import { invoke } from "@tauri-apps/api/tauri";

export function updateConfig(optionData, settingData) {
  return invoke("update_config", {
    config: {
      setting: {
        shortcut: settingData.shortcut,
        search_text: settingData.search_text,
      },
      option: optionData.allDataList ? optionData.allDataList : optionData,
    },
  });
}

export function openUrl(url, browser = "") {
  invoke("open_url", {
    url: url,
    browser: browser,
  }).then((res) => {});
}

export function openApp(option) {
  invoke("open_app", {
    optionType: option.option_type,
    openIn: option.open_in,
    path: option.path,
  }).then((res) => {});
}
