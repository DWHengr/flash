import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ReplaceText() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [content, setContent] = useState("");
  const [resultContent, setResultContent] = useState("");
  const [key, setKey] = useState("");
  const [rex, setRex] = useState("");

  const onRtx = () => {
    const regex = new RegExp(rex, "g");
    const replacedText = content.replace(regex, key);
    setResultContent(replacedText);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
  }, [searchData.trigger]);

  return (
    <div
      className="rtx-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="rtx-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="rtx-bar">
        <div style={{ position: "relative" }}>
          <div
            style={{ display: "inline-block", marginLeft: 10, marginRight: 10 }}
          >
            正则表达式:
            <input
              value={rex}
              onChange={(e) => {
                setRex(e.target.value);
              }}
            ></input>
          </div>
          <div
            style={{ display: "inline-block", marginLeft: 10, marginRight: 10 }}
          >
            替换文本:
            <input
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            ></input>
          </div>
          <div className="rtx-button" onClick={onRtx}>
            替换
          </div>
          <div className="rtx-from-to"></div>
        </div>
      </div>
      <textarea
        className="rtx-to-box"
        value={resultContent}
        onChange={(e) => {
          setResultContent(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
