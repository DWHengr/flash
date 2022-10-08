import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";

function App() {
  const [content, setContent] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [option, setOption] = useState([]);
  const seekOptionContain = useRef(null);
  const [allOption, setAllOption] = useState([]);

  useEffect(() => {
    invoke("load_config").then(async (res) => {
      if (res) {
        setAllOption(res.app);
        await setOption(allOption);
      }
    });
  }, []);

  useEffect(() => {
    if (content && content != "") {
      appWindow.setSize(new PhysicalSize(600, 410));
    } else {
      appWindow.setSize(new PhysicalSize(600, 60));
    }
    console.log(allOption);
    let currentOption = allOption.filter(
      (item) => item.name?.indexOf(content) != -1
    );
    setOption(currentOption);
  }, [content]);

  const onDoubleClick = (e) => {};

  const onKeyDown = async (e) => {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13) {
      await invoke("open_app", {
        appType: option[optionIndex].app_type,
        openIn: option[optionIndex].open_in,
        path: option[optionIndex].path,
      }).then((res) => {
        if (res == 0) {
          setContent("");
        }
      });
    }
  };

  const onGlobalKeyDown = async (e) => {
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

  return (
    <div
      className="container"
      onKeyDown={onGlobalKeyDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="row">
        <div>
          <input
            className="seek-input"
            value={content}
            onKeyDown={onKeyDown}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
            placeholder="Enter to open the world..."
          />
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
          {content &&
            content != "" &&
            option?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="seek-option"
                  style={{
                    "background-color":
                      index == optionIndex ? "rgb(78, 78, 78)" : "",
                  }}
                >
                  <img src="/icon.png" className="seek-option-icon"></img>
                  <div style={{ display: "inline-block" }}>
                    <div
                      className="seek-option-name"
                      dangerouslySetInnerHTML={{
                        __html: item.name?.replace(
                          content,
                          `<span class="seek-option-keyword">${content}</span>`
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
