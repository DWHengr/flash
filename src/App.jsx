import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import { getClient, ResponseType } from "@tauri-apps/api/http";
import AutosizeInput from "react-input-autosize";
import testapi from "./api/test";

function App() {
  const [content, setContent] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [option, setOption] = useState([]);
  const seekOptionContain = useRef(null);
  const seekInput = useRef(null);
  const [allOption, setAllOption] = useState([]);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    testapi
      .get()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    seekInput.current.focus();
    invoke("load_config").then(async (res) => {
      if (res) {
        await optionIcon(res.option);
        await setAllOption(res.option);
        await setOption(allOption);
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
    setOptionIndex(0);
    setIsLoginPage(false);
    if (content && content != "") {
      appWindow.setSize(new PhysicalSize(600, 410));
    } else {
      appWindow.setSize(new PhysicalSize(600, 60));
    }
    const kv = content?.split(/:|：/);
    let currentOption = allOption.filter(
      (item) => kv?.length == 1 || item.option_type?.indexOf(kv[0]) != -1
    );
    currentOption = currentOption.filter(
      (item) =>
        (kv?.length == 2 && !kv[1]) ||
        item.name?.indexOf(kv[1] ? kv[1] : kv[0]) != -1
    );
    setOption(currentOption);
  }, [content]);

  const onDoubleClick = (e) => {
    setIsLoginPage(!isLoginPage);
    if (!isLoginPage) appWindow.setSize(new PhysicalSize(600, 410));
    else appWindow.setSize(new PhysicalSize(600, 60));
  };

  const onKeyDown = async (e) => {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && content) {
      await invoke("open_app", {
        optionType: option[optionIndex].option_type,
        openIn: option[optionIndex].open_in,
        path: option[optionIndex].path,
      }).then((res) => {
        if (res) {
          setContent("");
        }
      });
    }
  };

  const onOptionClick = (index) => {
    invoke("open_app", {
      optionType: option[index].option_type,
      openIn: option[index].open_in,
      path: option[index].path,
    }).then((res) => {
      if (res == 0) {
        setContent("");
      }
    });
  };

  const onGlobalKeyDown = async (e) => {
    if (e.keyCode === 27) {
      appWindow.hide();
    }
    if (e.keyCode === 40 || e.keyCode === 9)
      if (optionIndex < option.length - 1) {
        if (optionIndex >= 6) seekOptionContain.current.scrollTop += 50;
        setOptionIndex(optionIndex + 1);
      } else {
        seekOptionContain.current.scrollTop = 0;
        setOptionIndex(0);
      }
    if (e.keyCode === 38) {
      if (optionIndex > 0) {
        if (optionIndex <= option.length - 7)
          seekOptionContain.current.scrollTop -= 50;
        setOptionIndex(optionIndex - 1);
      } else {
        seekOptionContain.current.scrollTop = (option.length - 7) * 50;
        setOptionIndex(option.length - 1);
      }
    }
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
          {isLoginPage && (
            <div style={{ height: "100%", display: "flex",userSelect:"none" }}>
              <div
                style={{
                  width: 300,
                  backgroundColor: "rgba(16, 16, 16, 0.1)",
                }}
              >
                <img className="head-portrait" src="/icon.png" />
                <div className="user-name">用户名</div>
                <button style={{ marginTop: 10 }} className="primary-button">
                  登录
                </button>
                <button style={{ marginTop: 10 }} className="primary-button">
                  注册
                </button>
              </div>
              <div
                style={{
                  width: "100%",
                }}
                className={"login"}
              >
                <label
                  style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
                >
                  登录
                </label>
                <div class="login_box">
                  <input type="text" v-model="username" required />
                  <label>用户名</label>
                </div>
                <div class="login_box">
                  <input type="text" v-model="username" required />
                  <label>密码</label>
                </div>
                <button
                  style={{
                    marginTop: 5,
                  }}
                  className="minor-button"
                >
                  登录 Flash
                </button>
              </div>
            </div>
          )}
          {!isLoginPage &&
            content &&
            content != "" &&
            option?.map((item, index) => {
              let kv = content?.split(/:|：/);
              let vlaue = kv[1] ? kv[1] : kv[0];
              return (
                <div
                  key={index}
                  className="seek-option"
                  onClick={() => onOptionClick(index)}
                  style={{
                    backgroundColor:
                      index == optionIndex ? "rgb(78, 78, 78)" : "",
                  }}
                >
                  <img src={item.icon} className="seek-option-icon" />

                  <div style={{ display: "inline-block" }}>
                    <div
                      className="seek-option-name"
                      dangerouslySetInnerHTML={{
                        __html: item.name?.replace(
                          vlaue,
                          `<span class="seek-option-keyword">${vlaue}</span>`
                        ),
                      }}
                    ></div>
                    <div className="seek-option-describe">{item.describe}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
