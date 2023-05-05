import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { encode, decode } from "../../utils/base64";
export default function Base64() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(encode(searchData.searchValue));
  }, [searchData.trigger]);

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
          <div
            className="base64-button"
            onClick={() => {
              setResultContent(encode(content));
            }}
          >
            base64加密
          </div>
          <div
            className="base64-button"
            onClick={() => {
              setResultContent(decode(content));
            }}
          >
            base64解码
          </div>
          <div className="base64-from-to"></div>
        </div>
      </div>
      <textarea
        className="base64-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
