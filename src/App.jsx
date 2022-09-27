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
      <div className="row">
      <img data-tauri-drag-region src="/icon.png" className="logo" />
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
    </div>
  );
}

export default App;
