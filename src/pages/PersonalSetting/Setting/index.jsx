import "./index.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTxt } from "../../../store/setting/action";
export default function Setting() {
  const settingData = useSelector((state) => state.settingData);
  const [shortcut, setShortcut] = useState(settingData.shortcut);
  const [searchText, setSearchText] = useState(settingData.search_text);
  const dispatch = useDispatch();

  const onKeyDown = (event) => {
    let shortcut = event.key;
    console.log(event.code);
    if (event.ctrlKey && event.altKey) {
      if (shortcut == "Control" || shortcut == "Alt") shortcut = "Alt+Ctrl+";
      else shortcut = `Alt+Ctrl+${shortcut}`;
      setShortcut(shortcut);
      return;
    }
    if (event.ctrlKey) {
      if (shortcut == "Control") shortcut = "Ctrl+";
      else shortcut = `Ctrl+${shortcut}`;
      setShortcut(shortcut);
      return;
    }
    if (event.altKey) {
      if (shortcut == "Alt") shortcut = "Alt+";
      else shortcut = `Alt+${shortcut}`;
      setShortcut(shortcut);
      return;
    }
  };

  return (
    <div className="setting-box">
      系统设置
      <div className="setting-option">
        <div className="setting-option-key">显示/隐藏快捷键</div>
        <div className="setting-option-value shortcut-input-box">
          <input
            style={{ caretColor: "transparent" }}
            onKeyDown={onKeyDown}
            value={shortcut}
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
            value={searchText}
          />
        </div>
      </div>
    </div>
  );
}
