import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Utf() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  const utf8Encode = (str) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    const hexArray = Array.from(encoded, (byte) =>
      byte.toString(16).padStart(2, "0")
    );
    const result = `\\x${hexArray.join("\\x")}`;
    return result;
  };

  const utf8Decode = (encodedStr) => {
    const hexArray = encodedStr.split("\\x").filter(Boolean);
    const bytes = new Uint8Array(hexArray.map((hex) => parseInt(hex, 16)));
    const decoder = new TextDecoder();
    const decoded = decoder.decode(bytes);
    return decoded;
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(utf8Encode(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="utf-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="utf-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="utf-bar">
        <div style={{ position: "relative" }}>
          <div
            className="utf-button"
            onClick={() => {
              setResultContent(utf8Encode(content));
            }}
          >
            utf编码
          </div>
          <div
            className="utf-button"
            onClick={() => {
              setResultContent(utf8Decode(content));
            }}
          >
            utf解码
          </div>
          <div className="utf-from-to"></div>
        </div>
      </div>
      <textarea
        className="utf-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
