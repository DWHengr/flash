import "./index.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTxt,
  setShortcutCmd,
  setSearchEngineTxt,
  setWindowSizeContent,
} from "../../../store/setting/action";
import { updateConfig } from "../../../utils/command";
import DropdownMenu from "../../../components/DropdownMenu";
import { useEffect } from "react";
export default function Setting() {
  const optionData = useSelector((state) => state.optionData);
  const settingData = useSelector((state) => state.settingData);
  const [shortcut, setShortcut] = useState(settingData.shortcut);
  const [searchText, setSearchText] = useState(settingData.search_text);
  const [oldShortcut, setOldShortcut] = useState(settingData.shortcut);
  const [oldSearchText, setOldSearchText] = useState(settingData.shortcut);
  const [searchEngine, setSearchEngine] = useState(settingData.search_engine);
  const [oldSearchEngine, setOldSearchEngine] = useState(
    settingData.search_engine
  );
  const [windowSize, setWindowSize] = useState(settingData.window_size);
  const [oldWindowSize, setOldWindowSize] = useState(settingData.window_size);
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

  useEffect(() => {
    updateConfig(optionData, settingData).then((res) => {
      console.log(res);
    });
  }, [settingData]);

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
            onSelect={async (value) => {
              if (
                value != oldShortcut &&
                value != "alt+ctrl+" &&
                value != "alt+" &&
                value != "ctrl+"
              ) {
                setShortcut(value);
                dispatch(setShortcutCmd(value));
                setOldShortcut(value);
              }
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
              if (e.target.value != oldSearchText) {
                setSearchText(e.target.value);
                dispatch(setSearchTxt(e.target.value));
                setOldSearchText(e.target.value);
              }
            }}
            value={searchText}
          />
        </div>
      </div>
      <div className="setting-option">
        <div className="setting-option-key">默认搜索引擎</div>
        <div className="setting-option-value shortcut-input-box">
          <DropdownMenu
            onSelect={async (value) => {
              if (value != oldSearchEngine) {
                setSearchEngine(value);
                dispatch(setSearchEngineTxt(value));
                setOldSearchEngine(value);
              }
            }}
            value={searchEngine}
            width={185}
            options={["baidu", "biying", "csdn"]}
            readOnly
          />
        </div>
      </div>
      <div className="setting-option">
        <div className="setting-option-key">窗口宽高</div>
        <div className="setting-option-value shortcut-input-box">
          <DropdownMenu
            onSelect={(value) => {
              if (value != oldWindowSize) {
                setWindowSize(value);
                dispatch(setWindowSizeContent(value));
                setOldWindowSize(value);
              }
            }}
            value={windowSize}
            width={185}
            options={["600x410", "700x510"]}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
