import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export default function Md5() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");

  const md5_16 = (str) => {
    return CryptoJS.MD5(str).toString().substr(8, 16);
  };

  const md5_32 = (str) => {
    return CryptoJS.MD5(str).toString();
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(md5_16(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="md5-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="md5-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="md5-bar">
        <div style={{ position: "relative" }}>
          <div
            className="md5-button"
            onClick={() => {
              setResultContent(md5_16(content));
            }}
          >
            加密16位
          </div>
          <div
            className="md5-button"
            onClick={() => {
              setResultContent(md5_32(content));
            }}
          >
            加密32位
          </div>
          <div className="md5-from-to"></div>
        </div>
      </div>
      <div className="md5-to-box">{resultContent}</div>
    </div>
  );
}
