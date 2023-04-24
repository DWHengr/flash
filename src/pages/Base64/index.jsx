import "./index.css";
import { useSelector } from "react-redux";
import { useState } from "react";
export default function Base64() {
  const settingData = useSelector((state) => state.settingData);
  const [content, setContent] = useState("");
  return (
    <div
      className="base64-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="base64-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="base64-bar">
        <div style={{ position: "relative" }}>
          <div className="base64-button" onClick={() => {}}>
            base64加密
          </div>
          <div className="base64-button" onClick={() => {}}>
            base64解码
          </div>
          <div className="base64-from-to"></div>
        </div>
      </div>
      <div className="base64-to-box">{}</div>
    </div>
  );
}
