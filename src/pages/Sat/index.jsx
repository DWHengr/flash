import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Chinese from "chinese-s2t";

export default function Sat() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(Chinese.s2t(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="url-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="url-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="url-bar">
        <div style={{ position: "relative" }}>
          <div
            className="url-button"
            onClick={() => {
              setResultContent(Chinese.s2t(content));
            }}
          >
            繁体
          </div>
          <div
            className="url-button"
            onClick={() => {
              setResultContent(Chinese.t2s(content));
            }}
          >
            简体
          </div>
          <div className="url-from-to"></div>
        </div>
      </div>
      <textarea
        className="url-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
