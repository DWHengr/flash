import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import { getClient, ResponseType } from "@tauri-apps/api/http";
import AutosizeInput from "react-input-autosize";
import {
  initOptionData,
  getOptionbyContent,
  setCurrentOptionIndex,
  openAppByIndex,
} from "./store/option/action";
import PersonalSetting from "./pages/PersonalSetting";
import Option from "./pages/Option";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [content, setContent] = useState("");
  const seekOptionContain = useRef(null);
  const seekInput = useRef(null);
  const [isPersonalSetting, setIsPersonalSetting] = useState(false);

  const optionData = useSelector((state) => state.optionData);
  const dispatch = useDispatch();

  useEffect(() => {
    seekInput.current.focus();
    invoke("load_config").then(async (res) => {
      if (res) {
        await optionIcon(res.option);
        dispatch(initOptionData(res.option));
      }
    });
  }, []);

  const optionIcon = async (options) => {
    const client = await getClient();
    for (let index = 0; index < options?.length; index++) {
      let o = options[index];
      o.icon = "/icon.svg";

      if (o.option_type == "project") o.icon = "/project.svg";
      if (o.option_type == "file") o.icon = "/file.svg";
      if (o.option_type == "app") o.icon = "/app.svg";
      if (o.option_type == "folder") o.icon = "/folder.svg";
      if (o.option_type == "link") {
        o.icon = "/link.svg";
        try {
          let pattern = new RegExp("^https?://[^/]*", "i");
          let domain = pattern.exec(o.path);
          if (domain)
            client
              .get(domain[0] + "/favicon.ico", {
                timeout: 5,
                responseType: ResponseType.Binary,
              })
              .then((res) => {
                if (res?.status == 200) {
                  o.icon =
                    "data:image/png;base64," +
                    btoa(
                      new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    );
                }
              });
        } catch {}
      }
    }
  };

  useEffect(() => {
    dispatch(setCurrentOptionIndex(0));
    setIsPersonalSetting(false);
    if (content && content != "") {
      appWindow.setSize(new PhysicalSize(600, 410));
    } else {
      appWindow.setSize(new PhysicalSize(600, 60));
    }
    dispatch(getOptionbyContent(content));
  }, [content]);

  const onDoubleClick = (e) => {
    setIsPersonalSetting(!isPersonalSetting);
    if (!isPersonalSetting) appWindow.setSize(new PhysicalSize(600, 410));
    else appWindow.setSize(new PhysicalSize(600, 60));
  };

  const onKeyDown = async (e) => {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && content) {
      dispatch(openAppByIndex(optionData.optionIndex));
    }
  };

  const onGlobalKeyDown = async (e) => {
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
    <div
      className="container"
      onKeyDown={onGlobalKeyDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="row">
        <div>
          <AutosizeInput
            autoFocus
            ref={seekInput}
            inputStyle={{
              fontSize: "30px",
              marginLeft: "2px",
              border: "1px solid transparent",
              maxWidth: 525,
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
          {!content && "Enter to open the world..."}
        </div>
        <img
          data-tauri-drag-region
          onDoubleClick={onDoubleClick}
          src="/icon.png"
          className="logo"
        />
      </div>
      <div>
        <div className="seek-option-contain" ref={seekOptionContain}>
          {isPersonalSetting && <PersonalSetting></PersonalSetting>}
          {!isPersonalSetting && content && content != "" && <Option></Option>}
        </div>
      </div>
    </div>
  );
}

export default App;
