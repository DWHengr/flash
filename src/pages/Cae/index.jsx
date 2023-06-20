import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Cae() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(searchData.searchValue.toUpperCase());
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
              setResultContent(content.toUpperCase());
            }}
          >
            大写
          </div>
          <div
            className="utf-button"
            onClick={() => {
              setResultContent(content.toLowerCase());
            }}
          >
            小写
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
