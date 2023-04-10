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
import { initOptionData } from "./store/option/action";
import { initUser } from "./store/user/action";
import { initSettingData } from "./store/setting/action";
import PersonalSetting from "./pages/PersonalSetting";
import Option from "./pages/Option";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { setOptionIcon } from "./utils/flash";
import {
  SetTrigger,
  setContentStore,
  setCurrentIndexStore,
  setCurrentListLenghtStore,
} from "./store/search/action";
import Engine from "./pages/engine";
import Default from "./pages/Default";

function App() {
  const [content, setContent] = useState("");
  const seekOptionContain = useRef(null);
  const seekInput = useRef(null);
  const [isPersonalSetting, setIsPersonalSetting] = useState(false);

  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);
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

  useEffect(() => {
    const { availHeight, availWidth } = window.screen;
    appWindow.setPosition(
      new PhysicalPosition(availWidth / 2 - 300, availHeight / 4)
    );
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", onGlobalKeyDown);
    };
  }, []);

  const optionIcon = async (options) => {
    for (let index = 0; index < options?.length; index++) {
      let o = options[index];
      setOptionIcon(o);
    }
  };

  const onWindowHide = (e) => {
    if (e.keyCode === 27) {
      appWindow.hide();
    }
  };

  const enlargeWindow = () => {
    appWindow.setSize(
      new LogicalSize(settingData.windowWidth, settingData.windowHeight)
    );
  };
  const contractWindow = () => {
    appWindow.setSize(
      new LogicalSize(settingData.windowWidth, searchBoxHeight)
    );
  };

  const openPage = (page) => {
    enlargeWindow();
    h.push(page);
  };

  useEffect(() => {
    dispatch(setCurrentIndexStore(0));
    setIsPersonalSetting(false);
    dispatch(SetTrigger(false));
    dispatch(setCurrentListLenghtStore(0));
    if (content && content != "") {
      const kv = content?.split(":");
      let key = kv[0] ? kv[0] : "";
      if (kv.length > 1) {
        switch (key) {
          case "":
          case "opt":
          case "link":
            openPage("/option");
            break;
          case "eng":
          case "baidu":
          case "biying":
          case "csdn":
            openPage("/engine");
            break;
          default:
            openPage("/default");
        }
      } else {
        openPage("/default");
      }
    } else {
      contractWindow();
    }
    dispatch(setContentStore(content));
  }, [content]);

  const onDoubleClick = (e) => {
    setIsPersonalSetting(!isPersonalSetting);
    if (!isPersonalSetting) {
      enlargeWindow();
      h.push("/personal");
    } else contractWindow();
  };

  const ignoreKey = ["v", "a", "c", "z"];

  const onGlobalKeyDown = (e) => {
    if ((e.ctrlKey || e.altKey) && ignoreKey.indexOf(e.key) < 0) {
      e.preventDefault();
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && content) {
      dispatch(SetTrigger(true));
    }
    if (e.keyCode === 27) {
      appWindow.hide();
    }
    let optionIndex = searchData.currentIndex;
    let optionLength = searchData.currentListLenght;
    let currentHeight = settingData.windowHeight - searchBoxHeight;
    if (e.keyCode === 40 || e.keyCode === 9)
      if (optionIndex < optionLength - 1) {
        if (optionIndex >= currentHeight / 50)
          seekOptionContain.current.scrollTop += 50;
        optionIndex++;
      } else {
        seekOptionContain.current.scrollTop = 0;
        optionIndex = 0;
      }
    if (e.keyCode === 38) {
      if (optionIndex > 0) {
        if (optionIndex <= optionLength - currentHeight / 50 + 1)
          seekOptionContain.current.scrollTop -= 50;
        optionIndex--;
      } else {
        seekOptionContain.current.scrollTop =
          (optionLength - currentHeight / 50 + 1) * 50;
        optionIndex = optionLength - 1;
      }
    }
    dispatch(setCurrentIndexStore(optionIndex));
  };

  const optionRoutes = [
    { path: "/engine", component: <Engine /> },
    { path: "/default", component: <Default /> },
    { path: "/option", component: <Option /> },
  ];

  return (
    <div className="mian-container" onContextMenu={(e) => e.preventDefault()}>
      <div className="row">
        <div>
          <AutosizeInput
            autoFocus
            ref={seekInput}
            inputStyle={{
              fontSize: "28px",
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
              render={({ location }) => (
                <div
                  className="option-contain"
                  style={{ height: settingData.windowHeight - searchBoxHeight }}
                  ref={seekOptionContain}
                >
                  {optionRoutes.map(
                    (route) =>
                      location.pathname === route.path && route.component
                  )}
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
