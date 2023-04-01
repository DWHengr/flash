import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./icon/iconfont.css";
import {
  appWindow,
  LogicalSize,
  PhysicalPosition,
} from "@tauri-apps/api/window";
import AutosizeInput from "react-input-autosize";
import {
  initOptionData,
  getOptionbyContent,
  setCurrentOptionIndex,
  openAppByIndex,
} from "./store/option/action";
import { initUser } from "./store/user/action";
import { initSettingData } from "./store/setting/action";
import PersonalSetting from "./pages/PersonalSetting";
import Option from "./pages/Option";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { setOptionIcon } from "./utils/flash";
import { openUrl } from "./utils/command";

function App() {
  const [content, setContent] = useState("");
  const seekOptionContain = useRef(null);
  const seekInput = useRef(null);
  const [isPersonalSetting, setIsPersonalSetting] = useState(false);

  const optionData = useSelector((state) => state.optionData);
  const settingData = useSelector((state) => state.settingData);
  const dispatch = useDispatch();
  const h = useHistory();
  const searchBoxHeight = 60;

  useEffect(() => {
    seekInput.current.focus();
    invoke("load_config").then(async (res) => {
      if (res) {
        await optionIcon(res.option);
        dispatch(initOptionData(res.option));
        dispatch(initSettingData(res.setting));
      }
    });
    dispatch(initUser());
  }, []);

  const optionIcon = async (options) => {
    for (let index = 0; index < options?.length; index++) {
      let o = options[index];
      setOptionIcon(o);
    }
  };

  useEffect(() => {
    const { availHeight, availWidth } = window.screen;
    appWindow.setPosition(
      new PhysicalPosition(availWidth / 2 - 300, availHeight / 4)
    );
  }, []);

  const onWindowHide = (e) => {
    if (e.keyCode === 27) {
      appWindow.hide();
    }
  };

  useEffect(() => {
    dispatch(setCurrentOptionIndex(0));
    setIsPersonalSetting(false);
    if (content && content != "") {
      appWindow.setSize(
        new LogicalSize(settingData.windowWidth, settingData.windowHeight)
      );
      h.push("/option");
    } else {
      appWindow.setSize(
        new LogicalSize(settingData.windowWidth, searchBoxHeight)
      );
    }
    dispatch(getOptionbyContent(content));
  }, [content]);

  const onDoubleClick = (e) => {
    setIsPersonalSetting(!isPersonalSetting);
    if (!isPersonalSetting) {
      appWindow.setSize(
        new LogicalSize(settingData.windowWidth, settingData.windowHeight)
      );
      h.push("/personal");
    } else
      appWindow.setSize(
        new LogicalSize(settingData.windowWidth, searchBoxHeight)
      );
  };

  const ignoreKey = ["v", "a", "c", "z"];

  const onGlobalKeyDown = (e) => {
    if ((e.ctrlKey || e.altKey) && ignoreKey.indexOf(e.key) < 0) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", onGlobalKeyDown);
    };
  }, []);

  const openSearchEngine = (engine, value) => {
    switch (engine) {
      case "biying":
        openUrl("https://cn.bing.com/search?q=" + value);
        break;
      case "csdn":
        openUrl("https://so.csdn.net/so/search?q=" + value);
        break;
      case "baidu":
      default:
        openUrl("https://www.baidu.com/s?wd=" + value);
        break;
    }
  };

  const openApp = () => {
    let key = optionData.searchKey;
    let value = optionData.searchValue;
    if (optionData.currentDataList?.length == 0 && !value) {
      openSearchEngine(settingData.search_engine, key);
      return;
    }
    if (!value) {
      dispatch(openAppByIndex(optionData.optionIndex));
      return;
    }
    switch (key) {
      case "baidu":
      case "biying":
      case "csdn":
        openSearchEngine(key, value);
        break;
      case "www":
        openUrl(value);
        break;
      default:
        if (optionData.currentDataList?.length == 0) {
          openUrl(`https://www.baidu.com/s?wd=${key}:${value}`);
        } else {
          dispatch(openAppByIndex(optionData.optionIndex));
        }
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && content) {
      openApp();
    }
    if (e.keyCode === 27) {
      appWindow.hide();
    }
    let optionIndex = optionData.optionIndex;
    let optionLength = optionData.currentDataList.length;
    if (e.keyCode === 40 || e.keyCode === 9)
      if (optionIndex < optionLength - 1) {
        if (optionIndex >= 6) seekOptionContain.current.scrollTop += 50;
        optionIndex++;
      } else {
        seekOptionContain.current.scrollTop = 0;
        optionIndex = 0;
      }
    if (e.keyCode === 38) {
      if (optionIndex > 0) {
        if (optionIndex <= optionLength - 7)
          seekOptionContain.current.scrollTop -= 50;
        optionIndex--;
      } else {
        seekOptionContain.current.scrollTop = (optionLength - 7) * 50;
        optionIndex = optionLength - 1;
      }
    }
    dispatch(setCurrentOptionIndex(optionIndex));
  };

  const renderOptionIcon = (type) => {
    if (type == "project")
      return <img src="/project.svg" className="seek-option-icon" />;
    if (type == "file")
      return <img src="/file.svg" className="seek-option-icon" />;
    if (type == "app")
      return <img src="/app.svg" className="seek-option-icon" />;
    if (type == "folder")
      return <img src="/folder.svg" className="seek-option-icon" />;
    if (type == "link")
      return <img src="/link.svg" className="seek-option-icon" />;
    return <img src="/icon.png" className="seek-option-icon" />;
  };

  return (
    <div className="mian-container" onContextMenu={(e) => e.preventDefault()}>
      <div className="row">
        <div>
          <AutosizeInput
            autoFocus
            ref={seekInput}
            inputStyle={{
              fontSize: "30px",
              marginLeft: "2px",
              border: "1px solid transparent",
              maxWidth: settingData.windowWidth - 75,
              fontFamily: "inherit",
              backgroundColor: "transparent",
              color: "rgb(235, 235, 235)",
              outline: "none",
            }}
            value={content}
            onKeyDown={onKeyDown}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
        </div>
        <div
          className="seek-placeholder"
          data-tauri-drag-region
          onMouseDown={() => {
            seekInput.current.focus();
          }}
        >
          {!content && settingData.search_text}
        </div>
        <img
          data-tauri-drag-region
          onDoubleClick={onDoubleClick}
          src="/icon.png"
          className="logo"
        />
      </div>
      <div>
        <div
          tabIndex="0"
          onKeyDown={onWindowHide}
          style={{
            height: settingData.windowHeight - searchBoxHeight,
            outline: "none",
          }}
        >
          <Switch>
            <Route path="/personal" component={PersonalSetting}></Route>
            <Route
              path="/option"
              render={() => (
                <div
                  className="option-contain"
                  style={{
                    height: settingData.windowHeight - searchBoxHeight,
                  }}
                  ref={seekOptionContain}
                >
                  <Option />
                </div>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
