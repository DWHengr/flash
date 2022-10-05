import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import AppSlection from "./components/AppSlection";

function App() {
  const [content, setContent] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const seekOptionContain = useRef(null);

  useEffect(() => {
    if (content && content != "") {
      appWindow.setSize(new PhysicalSize(600, 410));
    } else {
      appWindow.setSize(new PhysicalSize(600, 60));
    }
  }, [content]);

  const onDoubleClick = (e) => {};

  const onKeyDown = async (e) => {
    console.log(e);
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 13) {
      await invoke("open_app", { content: content }).then((res) => {
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
  useEffect(() => {
    console.log(optionIndex);
  }, [optionIndex]);

  const option = [
    {
      name: "应用1",
      describe: "应用描述",
    },
    {
      name: "应用2",
      describe: "应用描述",
    },
    {
      name: "应用3",
      describe: "应用描述",
    },
    {
      name: "应用4",
      describe: "应用描述",
    },
    {
      name: "应用5",
      describe: "应用描述",
    },
    {
      name: "应用6",
      describe: "应用描述",
    },
    {
      name: "应用7",
      describe: "应用描述",
    },
    {
      name: "应用8",
      describe: "应用描述",
    },
    {
      name: "应用9",
      describe: "应用描述",
    },
    {
      name: "应用10",
      describe: "应用描述",
    },
    {
      name: "应用11",
      describe: "应用描述1",
    },
    {
      name: "应用12",
      describe: "应用描述1",
    },
    {
      name: "应用13",
      describe: "应用描述1",
    },
  ];

  return (
    <div className="container" onKeyDown={onGlobalKeyDown}>
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
            option.map((item, index) => {
              return (
                <div
                  key={index}
                  className="seek-option"
                  style={{
                    "background-color":
                      index == optionIndex ? "rgb(90, 90, 90)" : "",
                  }}
                >
                  <img src="/icon.png" className="seek-option-icon"></img>
                  <div style={{ display: "inline-block" }}>
                    <div className="seek-option-name">{item.name}</div>
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
