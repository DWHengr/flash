import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function TextCompress() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  const compress = (str) => {
    const compressed = str.replace(/\s+/g, "");
    return compressed;
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(compress(searchData.searchValue));
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
              setResultContent(compress(content));
            }}
          >
            压缩一行
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
