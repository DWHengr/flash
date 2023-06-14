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
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { sendFlashNotification, setOptionIcon } from "./utils/flash";
import {
  SetTrigger,
  setContentStore,
  setCurrentIndexStore,
  setCurrentListLenghtStore,
} from "./store/search/action";
import { optionPageRoutes } from "./pages/pageRoutes";
import db from "./utils/db";

function App() {
  const [content, setContent] = useState("");
  const seekOptionContain = useRef(null);
  const seekInput = useRef(null);
  const [isPersonalSetting, setIsPersonalSetting] = useState(false);

  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);
  const dispatch = useDispatch();
  const h = useHistory();
  const searchBoxHeight = settingData.searchBoxHeight;

  const optionRoutes = optionPageRoutes;

  useEffect(() => {
    const { availHeight, availWidth } = window.screen;
    appWindow.setPosition(
      new PhysicalPosition(availWidth / 2 - 300, availHeight / 4)
    );
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      db.schedules.toArray().then((data) => {
        if (data) {
          let currentTime = new Date();
          for (let i = 0; i < data.length; i++) {
            let sce = data[i];
            if (!sce.isNotification) {
              let startTime = new Date(sce.startTime);
              if (startTime > currentTime) {
                db.schedules.update(sce.id, { isNotification: true });
                sendFlashNotification("日程通知", sce.sceContent);
              }
            }
          }
        }
      });
    }, 2000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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
    dispatch(SetTrigger({ enter: false, tab: false }));
    dispatch(setCurrentListLenghtStore(0));
    if (content && content != "") {
      const kv = content?.split(":");
      let key = kv[0] ? kv[0] : "";
      if (kv.length > 1) {
        let idDefault = true;
        for (let index = 0; index < optionRoutes.length; index++) {
          let route = optionRoutes[index];
          if (route.cmds?.includes(key)) {
            openPage(route.path);
            idDefault = false;
            break;
          }
        }
        if (idDefault) {
          openPage("/default");
        }
      } else {
        openPage("/default");
      }
    } else {
      contractWindow();
    }
    if (content != searchData.content) {
      dispatch(setContentStore(content));
    }
  }, [content]);

  useEffect(() => {
    if (content != searchData.content) {
      setContent(searchData.content);
    }
  }, [searchData.content]);

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
      dispatch(SetTrigger({ enter: true }));
    }
    if (e.keyCode === 9) {
      if (content) {
        dispatch(SetTrigger({ tab: true }));
      } else {
        dispatch(setContentStore(settingData.tab_value));
      }
    }
    if (e.keyCode === 27) {
      appWindow.hide();
    }
    let optionIndex = searchData.currentIndex;
    let optionLength = searchData.currentListLenght;
    let currentHeight = settingData.windowHeight - searchBoxHeight;
    if (e.keyCode === 40) {
      if (optionIndex < optionLength - 1) {
        if (optionIndex >= currentHeight / 50 - 1)
          seekOptionContain.current.scrollTop += 50;
        optionIndex++;
      } else {
        seekOptionContain.current.scrollTop = 0;
        optionIndex = 0;
      }
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
                <div>
                  {optionRoutes.map(
                    (route, index) =>
                      route.component &&
                      location.pathname === route.path && (
                        <div
                          className="option-contain"
                          key={index}
                          style={{
                            height: settingData.windowHeight - searchBoxHeight,
                            overflowY: route.overflow ? "scroll" : "unset",
                          }}
                          ref={seekOptionContain}
                        >
                          <div key={route.path}>{route.component}</div>
                        </div>
                      )
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
