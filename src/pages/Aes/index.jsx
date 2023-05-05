import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import FlashInput from "../../components/FlashInput";

export default function Aes() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");
  const [key, setKey] = useState("");

  const encrypt = (str) => {
    return CryptoJS.AES.encrypt(str, key).toString();
  };

  const decrypt = (str) => {
    return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    setResultContent(encrypt(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="aes-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="aes-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="aes-bar">
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
            className="aes-button"
            onClick={() => {
              setResultContent(encrypt(content));
            }}
          >
            加密
          </div>
          <div
            className="aes-button"
            onClick={() => {
              setResultContent(decrypt(content));
            }}
          >
            解密
          </div>
          <div className="aes-from-to"></div>
        </div>
      </div>
      <textarea
        className="aes-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
