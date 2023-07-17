import shields from "../../api/shields";
import "./index.css";
import { useState } from "react";
import { PopoverPicker } from "../../components/PopoverPicker";
export default function Shields() {
  let [imgSrc, setImgSrc] = useState("");
  let [label, setLabel] = useState("label");
  let [message, setMessage] = useState("message");
  let [color, setColor] = useState("#4C1");
  let onCreateShield = async () => {
    shields
      .create(
        encodeURIComponent(
          `${label ? label : "label"}-${message ? message : "message"}-${
            color ? color : "#4C1"
          }`
        )
      )
      .then((res) => {
        setImgSrc(res);
      });
  };

  return (
    <div className="shd-box">
      <div style={{ margin: 5 }}>
        颜色：
        <input
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <PopoverPicker
          style={{ display: "inline-block", width: 20, height: 20 }}
          color={color}
          onChange={setColor}
        />
      </div>
      <div style={{ margin: 5 }}>
        文案：
        <input
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
        -
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <div
        style={{ margin: 5 }}
        className="shd-button"
        onClick={onCreateShield}
      >
        徽章生成
      </div>
      <div style={{ margin: 5 }}>
        预览：
        <div dangerouslySetInnerHTML={{ __html: imgSrc }} />
      </div>
    </div>
  );
}
