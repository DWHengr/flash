import "./index.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTxt, setShortcutCmd } from "../../../store/setting/action";
import { updateConfig } from "../../../utils/command";
import DropdownMenu from "../../../components/DropdownMenu";
export default function Setting() {
  const optionData = useSelector((state) => state.optionData);
  const settingData = useSelector((state) => state.settingData);
  const [shortcut, setShortcut] = useState(settingData.shortcut);
  const [searchText, setSearchText] = useState(settingData.search_text);
  const [oldShortcut, setOldShortcut] = useState(settingData.shortcut);
  const [oldSearchText, setOldSearchText] = useState(settingData.search_text);
  const dispatch = useDispatch();

  const onKeyDown = (event) => {
    let shortcut = event.key;
    if (event.ctrlKey && event.altKey) {
      if (shortcut == "Control" || shortcut == "Alt") shortcut = "alt+ctrl+";
      else {
        shortcut = `alt+ctrl+${shortcut}`;
        dispatch(setShortcutCmd(shortcut));
      }
      setShortcut(shortcut);
      return;
    }
    if (event.ctrlKey) {
      if (shortcut == "Control") shortcut = "ctrl+";
      else {
        shortcut = `ctrl+${shortcut}`;
        dispatch(setShortcutCmd(shortcut));
      }
      setShortcut(shortcut);
      return;
    }
    if (event.altKey) {
      if (shortcut == "Alt") shortcut = "alt+";
      else {
        shortcut = `alt+${shortcut}`;
        dispatch(setShortcutCmd(shortcut));
      }
      setShortcut(shortcut);
      return;
    }
  };

  let onBlur = () => {
    updateConfig(optionData, settingData).then(async (res) => {
      if (res) {
        console.log(res);
      }
    });
  };

  return (
    <div className="setting-box">
      系统设置
      <div className="setting-option">
        <div className="setting-option-key">显示/隐藏快捷键</div>
        <div className="setting-option-value shortcut-input-box">
          <DropdownMenu
            width={185}
            onKeyDown={onKeyDown}
            value={shortcut}
            onBlur={() => {
              if (
                shortcut != oldShortcut &&
                shortcut != "alt+ctrl+" &&
                shortcut != "alt+" &&
                shortcut != "ctrl+"
              ) {
                onBlur();
                setOldShortcut(shortcut);
              }
            }}
            onSelect={(value) => {
              setShortcut(value);
              dispatch(setShortcutCmd(value));
            }}
            options={["alt+space", "ctrl+space", "alt+ctrl+space"]}
            readOnly
          />
        </div>
      </div>
      <div className="setting-option">
        <div className="setting-option-key">搜索框文本</div>
        <div className="setting-option-value shortcut-input-box">
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
              dispatch(setSearchTxt(e.target.value));
            }}
            onBlur={() => {
              if (searchText != oldSearchText) {
                onBlur();
                setOldSearchText(searchText);
              }
            }}
            value={searchText}
          />
        </div>
      </div>
    </div>
  );
}
