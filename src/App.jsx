import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {
  PhysicalSize,
  appWindow,
} from "@tauri-apps/api/window";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    appWindow.setSize(new PhysicalSize(600, 400));
  }

  const  hide = async () =>{
    appWindow.hide();
    await invoke("main_set_hide");
  }

  return (
    <div className="container">
      <div className="bar" data-tauri-drag-region></div>{" "}
      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => greet()}>
            Greet
          </button>
          <button type="button" onClick={() => hide()}>
            hide
          </button>
        </div>
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
