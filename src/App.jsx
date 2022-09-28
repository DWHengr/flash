import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";

function App() {
  const [content, setContent] = useState("");

  async function greet() {
    appWindow.setSize(new PhysicalSize(600, 400));
  }

  const onDoubleClick = (e) => {};

  const onKeyDown = async () => {
    if (window.event.keyCode === 13) {
      await invoke("open_app", { content: content }).then((res) => {
        if (res == 0) {
          setContent("");
        }
      });
    }
  };

  return (
    <div className="container">
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
    </div>
  );
}

export default App;
