import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export default function Des() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");
  const [key, setKey] = useState("");

  const encrypt = (str) => {
    return CryptoJS.DES.encrypt(str, key).toString();
  };

  const decrypt = (str) => {
    return CryptoJS.DES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(encrypt(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="des-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="des-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="des-bar">
        <div style={{ position: "relative" }}>
          <div
            style={{ display: "inline-block", marginLeft: 10, marginRight: 10 }}
          >
            秘钥:
            <input
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            ></input>
          </div>
          <div
            className="des-button"
            onClick={() => {
              setResultContent(encrypt(content));
            }}
          >
            加密
          </div>
          <div
            className="des-button"
            onClick={() => {
              setResultContent(decrypt(content));
            }}
          >
            解密
          </div>
          <div className="des-from-to"></div>
        </div>
      </div>
      <textarea
        className="des-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
